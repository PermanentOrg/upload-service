import Joi from "joi";
import type { ValidationError } from "joi";
import type {
	CreateFileDestinationUrlParams,
	StartMultipartUploadParams,
	CreateMultipartUploadUrlParams,
	CompleteMultipartUploadParams,
} from "../services/fileDestinationUrl.service";

const MIN_BUCKET_NAME_LENGTH = 3;
const MAX_BUCKET_NAME_LENGTH = 63;
const MAX_FILE_NAME_LENGTH = 1024;
const MIN_FILE_SIZE_IN_BYTES = 0;
const STARTING_PART_NUMBER = 1;
const MAX_PART_NUMBER = 10000;

export const isValidationError = (value: unknown): value is ValidationError =>
	value instanceof Object && "isJoi" in value && value.isJoi === true;

export const validateCreateFileDestinationUrlParams: (
	data: unknown,
) => asserts data is CreateFileDestinationUrlParams = (data) => {
	const validation = Joi.object()
		.keys({
			bucket: Joi.string()
				.min(MIN_BUCKET_NAME_LENGTH, "utf8")
				.max(MAX_BUCKET_NAME_LENGTH, "utf8")
				.required(),
			fileName: Joi.string().max(MAX_FILE_NAME_LENGTH, "utf8"),
			fileType: Joi.string().required(),
			maxSize: Joi.number().min(MIN_FILE_SIZE_IN_BYTES).required(),
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
			bucket: Joi.string()
				.min(MIN_BUCKET_NAME_LENGTH, "utf8")
				.max(MAX_BUCKET_NAME_LENGTH, "utf8")
				.required(),
			fileName: Joi.string().max(MAX_FILE_NAME_LENGTH, "utf8"),
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
			bucket: Joi.string()
				.min(MIN_BUCKET_NAME_LENGTH, "utf8")
				.max(MAX_BUCKET_NAME_LENGTH, "utf8")
				.required(),
			key: Joi.string().required(),
			uploadId: Joi.string().required(),
			fileSizeInBytes: Joi.number().min(MIN_FILE_SIZE_IN_BYTES).required(),
			startingPartNumber: Joi.number().min(STARTING_PART_NUMBER).required(),
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
			bucket: Joi.string()
				.min(MIN_BUCKET_NAME_LENGTH, "utf8")
				.max(MAX_BUCKET_NAME_LENGTH, "utf8")
				.required(),
			key: Joi.string().required(),
			uploadId: Joi.string().required(),
			parts: Joi.array()
				.items(
					Joi.object().keys({
						ETag: Joi.string().required(),
						PartNumber: Joi.number()
							.min(STARTING_PART_NUMBER)
							.max(MAX_PART_NUMBER)
							.required(),
					}),
				)
				.required(),
		})
		.validate(data, { abortEarly: false });
	if (validation.error !== undefined) {
		throw validation.error;
	}
};
