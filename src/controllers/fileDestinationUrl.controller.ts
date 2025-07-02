import type { Request, Response, NextFunction } from "express";
import { fileDestinationUrlService } from "../services";
import {
  isValidationError,
  validateStartMultipartUploadParams,
  validateCreateFileDestinationUrlParams,
  validateCreateMultipartUploadUrlParams,
  validateCompleteMultipartUploadParams,
} from "../validators";
import { serializeError } from "../utils";

const createFileDestinationUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    validateCreateFileDestinationUrlParams(req.body);
    fileDestinationUrlService
      .createFileDestinationUrl(req.body)
      .then((data) => res.json(data))
      .catch((err: Error) =>
        res.status(500).json({
          error: serializeError(err),
        }),
      );
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
};

const startMultipartUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    validateStartMultipartUploadParams(req.body);
    const data = await fileDestinationUrlService.startMultipartUpload(req.body);
    res.json(data);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
};

const createMultipartUploadUrls = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    validateCreateMultipartUploadUrlParams(req.body);
    const data = await fileDestinationUrlService.createMultipartUploadUrls(
      req.body,
    );
    res.json(data);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
};

const completeMultipartUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    validateCompleteMultipartUploadParams(req.body);
    const data = await fileDestinationUrlService.completeMultipartUpload(
      req.body,
    );
    res.json(data);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
};

export const fileDestinationUrlController = {
  createFileDestinationUrl,
  startMultipartUpload,
  createMultipartUploadUrls,
  completeMultipartUpload,
};
