import express from 'express';
import bodyParser from 'body-parser';
import { apiRoutes } from './routes';

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.listen(process.env.PORT ?? 3000);
