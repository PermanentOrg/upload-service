import Joi from "joi";
import type { ValidationError } from "joi";
import type {
	CreateFileDestinationUrlParams,
	StartMultipartUploadParams,
	CreateMultipartUploadUrlParams,
	CompleteMultipartUploadParams,
} from "../services/fileDestinationUrl.service";

export const isValidationError = (value: unknown): value is ValidationError =>
	value instanceof Object && "isJoi" in value && value.isJoi === true;

export const validateCreateFileDestinationUrlParams: (
	data: unknown,
) => asserts data is CreateFileDestinationUrlParams = (data) => {
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
};

export const validateStartMultipartUploadParams: (
	data: unknown,
) => asserts data is StartMultipartUploadParams = (data) => {
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
};

export const validateCreateMultipartUploadUrlParams: (
	data: unknown,
) => asserts data is CreateMultipartUploadUrlParams = (data) => {
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
};

export const validateCompleteMultipartUploadParams: (
	data: unknown,
) => asserts data is CompleteMultipartUploadParams = (data) => {
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
};
