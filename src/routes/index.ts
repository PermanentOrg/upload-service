import express from 'express';
import { healthController } from '../controllers';

const apiRoutes = express.Router();
apiRoutes.get('/health', healthController.getHealth);

export { apiRoutes };
