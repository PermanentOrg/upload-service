import type { Request, Response } from 'express';
import { fileDestinationUrlService } from '../services';

interface CreateFileDestinationRequest extends Request {
  body: {
    bucket: string;
    fileName: string;
    fileType: string;
    maxSize: number;
    path: string;
  };
}

const createFileDestinationUrl = (
  req: CreateFileDestinationRequest,
  res: Response,
): void => {
  fileDestinationUrlService.createFileDestinationUrl(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
};

export const fileDestinationUrlController = {
  createFileDestinationUrl,
};
