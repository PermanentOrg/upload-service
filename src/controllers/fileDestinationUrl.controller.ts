import type { Request, Response, NextFunction } from "express";
import type { CreateFileDestinationUrlParams } from "../services/fileDestinationUrl.service";
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
  next: NextFunction
): void => {
  try {
    validateCreateFileDestinationUrlParams(req.body);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
  fileDestinationUrlService
    .createFileDestinationUrl(req.body)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(500).json({
        error: serializeError(err),
      })
    );
};

const startMultipartUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateStartMultipartUploadParams(req.body);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
  try {
    const data = await fileDestinationUrlService.startMultipartUpload(
      req.body
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createMultipartUploadUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateCreateMultipartUploadUrlParams(req.body);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
  try {
    const data = await fileDestinationUrlService.createMultipartUploadUrls(
      req.body
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const completeMultipartUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateCompleteMultipartUploadParams(req.body);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).json({ error: err });
      return;
    }
    next(err);
  }
  try {
    const data = await fileDestinationUrlService.completeMultipartUpload(
      req.body
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const fileDestinationUrlController = {
  createFileDestinationUrl,
  startMultipartUpload,
  createMultipartUploadUrls,
  completeMultipartUpload,
};
