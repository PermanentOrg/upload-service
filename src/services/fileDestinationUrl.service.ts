import {
	S3Client,
	CreateMultipartUploadCommand,
	UploadPartCommand,
	CompleteMultipartUploadCommand,
	type CompletedPart,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import {
	EMPTY_FILE_LENGTH_BYTES,
	ONE_DAY_SECONDS,
	ONE_HOUR_SECONDS,
	TEN_MB_BYTES,
} from "../constants";

export interface CreateFileDestinationUrlParams {
	bucket: string;
	fileName: string;
	fileType: string;
	maxSize: number;
	path: string;
}

export interface StartMultipartUploadParams {
	bucket: string;
	fileName: string;
	path: string;
}

export interface StartMultipartUploadResponse {
	key: string;
	uploadId: string;
}

export interface CreateMultipartUploadUrlParams {
	bucket: string;
	key: string;
	uploadId: string;
	fileSizeInBytes: number;
	startingPartNumber: number;
}

export interface CreateMultipartUploadUrlsResponse {
	urls: string[];
}

export interface CompleteMultipartUploadParams {
	bucket: string;
	key: string;
	uploadId: string;
	parts: CompletedPart[];
}

export interface CompleteMultipartUploadResponse {
	uploadUrl: string;
}

export interface CreateFileDestinationUrlResponse {
	destinationUrl: string;
	presignedPost: PresignedPost;
}

const createFileDestinationUrl = async ({
	bucket,
	fileType,
	maxSize,
	fileName = "",
	path = "",
}: CreateFileDestinationUrlParams): Promise<CreateFileDestinationUrlResponse> => {
	const resolvedFileName = fileName === "" ? uuidv4() : fileName;
	const key = `${path}/${resolvedFileName}`;
	const presignedPost = await createPresignedPost(new S3Client({}), {
		Bucket: bucket,
		Key: key,
		Expires: ONE_HOUR_SECONDS,
		Conditions: [
			["eq", "$Content-Type", fileType],
			["content-length-range", EMPTY_FILE_LENGTH_BYTES, maxSize],
		],
	});
	return {
		destinationUrl: `https://${bucket}.s3.amazonaws.com/${key}`,
		presignedPost,
	};
};

const startMultipartUpload = async ({
	bucket,
	fileName = "",
	path = "",
}: StartMultipartUploadParams): Promise<StartMultipartUploadResponse> => {
	const resolvedFileName = fileName === "" ? uuidv4() : fileName;
	const key = `${path}/${resolvedFileName}`;
	const client = new S3Client({});
	const { UploadId: uploadId } = await client.send(
		new CreateMultipartUploadCommand({
			Bucket: bucket,
			Key: key,
		}),
	);

	if (uploadId === undefined) {
		throw new Error("S3 did not return an upload ID");
	}

	return { key, uploadId };
};

const createMultipartUploadUrls = async ({
	bucket,
	key,
	uploadId,
	fileSizeInBytes,
	startingPartNumber,
}: CreateMultipartUploadUrlParams): Promise<CreateMultipartUploadUrlsResponse> => {
	const client = new S3Client({});
	const urls = await Promise.all(
		[...Array(Math.ceil(fileSizeInBytes / TEN_MB_BYTES)).keys()].map(
			async (i: number): Promise<string> => {
				const url = await getSignedUrl(
					client,
					new UploadPartCommand({
						Bucket: bucket,
						Key: key,
						UploadId: uploadId,
						PartNumber: startingPartNumber + i,
					}),
					{ expiresIn: ONE_DAY_SECONDS },
				);
				return url;
			},
		),
	);

	return { urls };
};

const completeMultipartUpload = async ({
	bucket,
	key,
	uploadId,
	parts,
}: CompleteMultipartUploadParams): Promise<CompleteMultipartUploadResponse> => {
	const client = new S3Client({});
	const result = await client.send(
		new CompleteMultipartUploadCommand({
			Bucket: bucket,
			Key: key,
			UploadId: uploadId,
			MultipartUpload: {
				Parts: parts,
			},
		}),
	);
	const uploadUrl = decodeURIComponent(result.Location ?? "");
	return { uploadUrl };
};

export const fileDestinationUrlService = {
	createFileDestinationUrl,
	startMultipartUpload,
	createMultipartUploadUrls,
	completeMultipartUpload,
};
