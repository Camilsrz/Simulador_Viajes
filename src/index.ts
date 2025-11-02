import express from 'express';
import {travel} from './models/travel';
import { createTraveldto } from './dtos/createTravel.dto';

const app = express();
app.use(express.json());

let travels: travel[] = [];
let nextId = 1;

// POST CREAR
app.post('/travels', (req,res) =>{
  const travelData= req.body as createTraveldto;

if (!travelData.destination || !travelData.days || !travelData.travelers || !travelData.transport || !travelData.lodging || !travelData.budgetPerPerson) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const totalBudget = travelData.days * travelData.travelers * travelData.budgetPerPerson;
  const newTravel: travel = {
    id: nextId++,
    ...travelData,
    activities: travelData.activities || [], // asegurar que activities no sea undefined
    totalBudget,
    createdAt: new Date().toISOString(),
  };

  travels.push(newTravel);
  res.status(201).json(newTravel)
});

// GET OBTENER
app.get('/travels', (req, res) => {
  res.json(travels);
});

// GET OBTENER POR ID
app.get('/travels/:id', (req, res) => {
  const id = Number(req.params.id);
  const travel = travels.find(t => t.id === id);

  if (!travel) return res.status(404).json({ error: 'Viaje no encontrado' });
  res.json(travel);
});

// PUT ACTUALIZAR
app.put('/travels/:id', (req, res) => {
  const id = Number(req.params.id);
  const travel = travels.find(t => t.id === id);

  if (!travel) return res.status(404).json({ error: 'Viaje no encontrado' });

  const update = req.body as Partial<createTraveldto>;
  Object.assign(travel, update);

  travel.totalBudget = travel.days * travel.travelers * travel.budgetPerPerson;

  res.json(travel);
});

// DELETE 
app.delete('/travels/:id', (req, res) => {
  const id= Number(req.params.id)
  const index = travels.findIndex(t=>t.id ===id);
  if (index=== -1) return res.status(404).json({error:'Viaje no encontrado'})
  travels.splice(index, 1);
  res.status(204).send();
});

// GET OBTENER EXPORTACION
app.get('/travels/:id/export', (req, res) => {
  const id= Number(req.params.id);
  const travel = travels.find(t => t.id === id);
  

  if (!travel) {
    return res.status(404).json({ error: 'Presupuesto no encontrado' });
  }
  const format = (req.query.format as string) || 'pdf';
  if (format !== 'pdf') {
    return res.status(400).json({ error: 'Solo se permite exportar en formato PDF' });
  }
  res.json({
    message: `Se exportó el viaje a ${travel.destination} en formato PDF`,
    travelId: travel.id,
  });
});

// PATCH ACTUALIZAR PARCIAL
app.patch('/travels/:id', (req, res) => {
  const id = Number(req.params.id);
  const travel = travels.find(t => t.id === id);
  if (!travel) return res.status(404).json({ error: 'Presupuesto no encontrado' });

  Object.assign(travel, req.body);
  travel.totalBudget = travel.days * travel.travelers * travel.budgetPerPerson;

  res.json({
    ...travel,
    totalBudgetCOP: `${travel.totalBudget.toLocaleString('es-CO')} COP`,
  });
});

app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
  });
