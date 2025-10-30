import express from 'express';
import travelsRoutes from './routes/travels.routes';

const app = express();
app.use(express.json());
app.use('/travels', travelsRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

