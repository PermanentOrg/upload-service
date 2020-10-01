import express from 'express';
import { apiRoutes } from './routes';

const app = express();
app.use('/api', apiRoutes);
app.listen(process.env.PORT ?? 3000);
