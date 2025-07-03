import Joi from "joi";
import type { ValidationError } from "joi";
import type {
	CreateFileDestinationUrlParams,
	StartMultipartUploadParams,
	CreateMultipartUploadUrlParams,
	CompleteMultipartUploadParams,
} from "../services/fileDestinationUrl.service";

export const isValidationError = (err: unknown): err is ValidationError =>
	(err as ValidationError).isJoi;

export function validateCreateFileDestinationUrlParams(
	data: unknown,
): asserts data is CreateFileDestinationUrlParams {
	const validation = Joi.object()
		.keys({
			bucket: Joi.string().min(3, "utf8").max(63, "utf8").required(),
			fileName: Joi.string().max(1024, "utf8"),
			fileType: Joi.string().required(),
			maxSize: Joi.number().min(0).required(),
			path: Joi.string(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
}

export function validateStartMultipartUploadParams(
	data: unknown,
): asserts data is StartMultipartUploadParams {
	const validation = Joi.object()
		.keys({
			bucket: Joi.string().min(3, "utf8").max(63, "utf8").required(),
			fileName: Joi.string().max(1024, "utf8"),
			path: Joi.string(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
}

export function validateCreateMultipartUploadUrlParams(
	data: unknown,
): asserts data is CreateMultipartUploadUrlParams {
	const validation = Joi.object()
		.keys({
			bucket: Joi.string().min(3, "utf8").max(63, "utf8").required(),
			key: Joi.string().required(),
			uploadId: Joi.string().required(),
			fileSizeInBytes: Joi.number().min(1).required(),
			startingPartNumber: Joi.number().min(1).required(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
}

export function validateCompleteMultipartUploadParams(
	data: unknown,
): asserts data is CompleteMultipartUploadParams {
	const validation = Joi.object()
		.keys({
			bucket: Joi.string().min(3, "utf8").max(63, "utf8").required(),
			key: Joi.string().required(),
			uploadId: Joi.string().required(),
			parts: Joi.array()
				.items(
					Joi.object().keys({
						ETag: Joi.string().required(),
						PartNumber: Joi.number().min(1).max(10000).required(),
					}),
				)
				.required(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
}
