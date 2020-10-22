import type { Request, Response } from 'express';
import type { CreateFileDestinationUrlParams } from '../services/fileDestinationUrl.service';
import { fileDestinationUrlService } from '../services';
import { validateCreateFileDestinationUrlParams } from '../validators';
import { serializeError } from '../utils';

interface CreateFileDestinationRequest extends Request {
  body: CreateFileDestinationUrlParams;
}

const createFileDestinationUrl = (
  req: CreateFileDestinationRequest,
  res: Response,
): void => {
  const validation = validateCreateFileDestinationUrlParams(req.body);
  if (validation.error) {
    res.status(400).json({ error: validation.error });
  } else {
    fileDestinationUrlService.createFileDestinationUrl(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({
        error: serializeError(err),
      }));
  }
};

export const fileDestinationUrlController = {
  createFileDestinationUrl,
};
