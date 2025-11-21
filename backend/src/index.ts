import PDFDocument from 'pdfkit';
import express, { Request, Response, NextFunction } from 'express';
import { travel } from './models/travel';
import { createTraveldto } from './dtos/createTravel.dto';
import { pool } from './db';
import { hashPassword, comparePassword, signToken } from './auth';
import { createUserDto } from './dtos/createUser.dto';
import { authMiddleware } from './middleware/authMiddleware';
import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors({
  origin: 'https://simulador-viajes.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


/** REGISTER */
app.post('/auth/register', async (req, res) => {
  try {
    const body = req.body as createUserDto;
    const { email, password, name } = body;

    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son obligatorios' });

    // Validar si existe
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) return res.status(409).json({ error: 'El email ya está registrado' });

    const hashed = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (email, password, name) VALUES ($1,$2,$3) RETURNING id, email, name, role, created_at`,
      [email, hashed, name || null]
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

//Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string; };
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son obligatorios' });

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

    const user = result.rows[0];
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    delete user.password;
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


// POST CREAR
app.post('/travels', authMiddleware, async (req, res) => {
  try {
    const travelData = req.body as createTraveldto;
    const { destination, days, travelers, transport, lodging, activities, budgetPerPerson } = travelData;

    const userId = (req as any).user.id; // USUARIO DEL TOKEN

    const totalBudget = days * travelers * budgetPerPerson;

    const result = await pool.query(
      `INSERT INTO travels (destination, days, travelers, transport, lodging, activities, budgetPerPerson, totalBudget, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [destination, days, travelers, transport, lodging, activities, budgetPerPerson, totalBudget, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el viaje' });
  }
});


// GET OBTENER
app.get('/travels', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id; 

    const result = await pool.query(
      'SELECT * FROM travels WHERE user_id = $1 ORDER BY id ASC',
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los viajes del usuario' });
  }
});




// GET OBTENER POR ID
app.get('/travels/:id', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const travelId = Number(req.params.id);

    const result = await pool.query(
      'SELECT * FROM travels WHERE id = $1 AND user_id = $2',
      [travelId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Viaje no encontrado o no autorizado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el viaje' });
  }
});

// PUT ACTUALIZAR
app.put('/travels/:id', async (req, res) => {
  const id = Number(req.params.id);
  const update = req.body as Partial<createTraveldto>;

  const result = await pool.query('SELECT * FROM travels WHERE id=$1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Viaje no encontrado' });

  const travel = result.rows[0];
  const updated = { ...travel, ...update };
  updated.totalbudget = updated.days * updated.travelers * updated.budgetperperson;

  const updatedResult = await pool.query(
    `UPDATE travels SET destination=$1, days=$2, travelers=$3, transport=$4, lodging=$5, activities=$6, budgetPerPerson=$7, totalBudget=$8 WHERE id=$9 RETURNING *`,
    [updated.destination, updated.days, updated.travelers, updated.transport, updated.lodging, updated.activities, updated.budgetperperson, updated.totalbudget, id]
  );

  res.json(updatedResult.rows[0]);
});


// DELETE 
function adminOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
}
app.delete('/travels/:id', authMiddleware, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query('DELETE FROM travels WHERE id = $1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Viaje no encontrado' });
  res.status(204).send();
});


// PATCH ACTUALIZAR PARCIAL
app.patch('/travels/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;

    const existing = await pool.query(
      'SELECT * FROM travels WHERE id=$1 AND user_id=$2',
      [id, userId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Viaje no encontrado o no autorizado' });
    }

    const travel = existing.rows[0];
    const updated = { ...travel, ...req.body };

    updated.totalbudget =
      updated.days * updated.travelers * updated.budgetperperson;

    const result = await pool.query(
      `UPDATE travels
       SET destination=$1, days=$2, travelers=$3, transport=$4, lodging=$5,
           activities=$6, budgetPerPerson=$7, totalBudget=$8
       WHERE id=$9 AND user_id=$10
       RETURNING *`,
      [
        updated.destination,
        updated.days,
        updated.travelers,
        updated.transport,
        updated.lodging,
        updated.activities,
        updated.budgetperperson,
        updated.totalbudget,
        id,
        userId,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el viaje' });
  }
});


// GET OBTENER EXPORTACION
app.get('/travels/:id/export', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const format = (req.query.format as string) || 'pdf';

    if (format !== 'pdf') {
      return res.status(400).json({ error: 'Solo se permite exportar en formato PDF' });
    }

    // Buscar el viaje en la base de datos
    const result = await pool.query('SELECT * FROM travels WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Viaje no encontrado' });
    }

    const travel = result.rows[0];

    // Configurar respuesta para descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=viaje-${id}.pdf`);

    // Crear documento PDF
    const doc = new PDFDocument();

    // Enviar el documento directamente al cliente
    doc.pipe(res);

    // Título
    doc.fontSize(20).text(`Presupuesto de viaje: ${travel.destination}`, { align: 'center' });
    doc.moveDown();

    // Detalles principales
    doc.text(`Destino: ${travel.destination}`);
    doc.text(`Días: ${travel.days}`);
    doc.text(`Viajeros: ${travel.travelers}`);
    doc.text(`Transporte: ${travel.transport}`);
    doc.text(`Alojamiento: ${travel.lodging}`);
    doc.text(`Presupuesto por persona: ${Number(travel.budgetperperson).toLocaleString('es-CO')} COP`);
    doc.text(`Presupuesto total: ${Number(travel.totalbudget).toLocaleString('es-CO')} COP`);
    doc.moveDown();

    // Actividades
    doc.fontSize(14).text('Actividades planeadas:', { underline: true });
    if (travel.activities && travel.activities.length > 0) {
      travel.activities.forEach((a: string, i: number) => {
        doc.fontSize(12).text(`${i + 1}. ${a}`);
      });
    } else {
      doc.fontSize(12).text('No se registraron actividades.');
    }

    // Fecha
    doc.moveDown();
    doc.fontSize(10).text(`Generado el: ${new Date().toLocaleString('es-CO')}`, { align: 'right' });

    // Finalizar documento
    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
});

app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
  });