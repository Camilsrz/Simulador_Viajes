import { Router } from 'express';
import { Travel } from '../models/travel';
import { CreateTravelDTO } from '../dtos/createTravel.dto';

const router = Router();
let travels: Travel[] = [];
let nextId = 1;

// POST Crear un nuevo viaje
router.post('/', (req, res) => {
  const { destination, days, travelers, transport, lodging, activities, budgetPerPerson } =
    req.body as CreateTravelDTO;

  if (!destination || !days || !travelers || !transport || !lodging || !budgetPerPerson) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const totalBudget = days * travelers * budgetPerPerson;
  const newTravel: Travel = {
    id: nextId++,
    destination,
    days,
    travelers,
    transport,
    lodging,
    activities: activities || [],
    budgetPerPerson,
    totalBudget,
    createdAt: new Date().toISOString(),
  };

  travels.push(newTravel);
  res.status(201).json({
    ...newTravel,
    totalBudgetCOP: `${newTravel.totalBudget.toLocaleString('es-CO')} COP`,
  });
});

// GET
router.get('/', (req, res) => {
  res.json(travels);
});

// GET ID
router.get('/:id', (req, res) => {
  const travel = travels.find(t => t.id === +req.params.id);
  if (!travel) return res.status(404).json({ error: 'Presupuesto no encontrado' });
  res.json(travel);
});

// PUT
router.put('/:id', (req, res) => {
  const travel = travels.find(t => t.id === +req.params.id);
  if (!travel) return res.status(404).json({ error: 'Presupuesto no encontrado' });

  const { destination, days, travelers, transport, lodging, activities, budgetPerPerson } =
    req.body as Partial<CreateTravelDTO>;

  if (destination !== undefined) travel.destination = destination;
  if (days !== undefined) travel.days = days;
  if (travelers !== undefined) travel.travelers = travelers;
  if (transport !== undefined) travel.transport = transport;
  if (lodging !== undefined) travel.lodging = lodging;
  if (activities !== undefined) travel.activities = activities;
  if (budgetPerPerson !== undefined) travel.budgetPerPerson = budgetPerPerson;

  travel.totalBudget = travel.days * travel.travelers * travel.budgetPerPerson;

  res.json({
    ...travel,
    totalBudgetCOP: `${travel.totalBudget.toLocaleString('es-CO')} COP`,
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = travels.findIndex(t => t.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Presupuesto no encontrado' });
  travels.splice(index, 1);
  res.status(204).send();
});

// GET
router.get('/:id/export', (req, res) => {
  const travel = travels.find(t => t.id === +req.params.id);
  const format = req.query.format as string;

  if (!travel) return res.status(404).json({ error: 'Presupuesto no encontrado' });

  if (!format || !['pdf', 'excel'].includes(format)) {
    return res.status(400).json({ error: 'Formato no soportado. Usa ?format=pdf o ?format=excel' });
  }

  // Simulación de exportación de archivos
  res.json({
    message: `El presupuesto del viaje a ${travel.destination} fue exportado exitosamente en formato ${format.toUpperCase()}.`,
    travelId: travel.id,
    format,
  });
});

// PATCH (actualización parcial)
router.patch('/:id', (req, res) => {
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

export default router;

