import Joi from 'joi';
import type { CreateFileDestinationUrlParams } from '../services/fileDestinationUrl.service';

export const validateCreateFileDestinationUrlParams = (
  data: CreateFileDestinationUrlParams,
): Joi.ValidationResult => Joi.object().keys({
  bucket: Joi.string().min(3, 'utf8').max(63, 'utf8').required(),
  fileName: Joi.string().max(1024, 'utf8'),
  fileType: Joi.string().required(),
  maxSize: Joi.number().min(1).required(),
  path: Joi.string(),
}).validate(
  data,
  { abortEarly: false },
);
