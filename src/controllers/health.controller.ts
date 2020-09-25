import type {
  Handler,
  Request,
  Response,
} from 'express';
import { healthService } from '../services';

const getHealth: Handler = (
  req: Request,
  res: Response,
): void => {
  res.json({
    status: healthService.getHealth(),
  });
};

export const healthController = {
  getHealth,
};
