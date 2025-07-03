import {
	S3Client,
	CreateMultipartUploadCommand,
	UploadPartCommand,
	CompleteMultipartUploadCommand,
	CompletedPart,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

const tenMB = 10 * 1024 * 1024;

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

export interface CreateMultipartUploadUrlParams {
	bucket: string;
	key: string;
	uploadId: string;
	fileSizeInBytes: number;
	startingPartNumber: number;
}

export interface CompleteMultipartUploadParams {
	bucket: string;
	key: string;
	uploadId: string;
	parts: CompletedPart[];
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
		Expires: 3600,
		Conditions: [
			["eq", "$Content-Type", fileType],
			["content-length-range", 0, maxSize],
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
}: StartMultipartUploadParams) => {
	const resolvedFileName = fileName === "" ? uuidv4() : fileName;
	const key = `${path}/${resolvedFileName}`;
	const client = new S3Client({});
	const { UploadId: uploadId } = await client.send(
		new CreateMultipartUploadCommand({
			Bucket: bucket,
			Key: key,
		}),
	);

	return { key, uploadId };
};

const createMultipartUploadUrls = async ({
	bucket,
	key,
	uploadId,
	fileSizeInBytes,
	startingPartNumber,
}: CreateMultipartUploadUrlParams) => {
	const client = new S3Client({});
	const urls = await Promise.all(
		[...Array(Math.ceil(fileSizeInBytes / tenMB)).keys()].map(
			async (i: number): Promise<string> => {
				const url = await getSignedUrl(
					client,
					new UploadPartCommand({
						Bucket: bucket,
						Key: key,
						UploadId: uploadId,
						PartNumber: startingPartNumber + i,
					}),
					{ expiresIn: 86400 },
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
}: CompleteMultipartUploadParams) => {
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
