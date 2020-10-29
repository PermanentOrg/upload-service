import express from 'express';
import {
  fileDestinationUrlController,
  healthController,
} from '../controllers';

const apiRoutes = express.Router();
apiRoutes.get('/health', healthController.getHealth);
apiRoutes.post('/fileDestinationUrl', fileDestinationUrlController.createFileDestinationUrl);
export { apiRoutes };
