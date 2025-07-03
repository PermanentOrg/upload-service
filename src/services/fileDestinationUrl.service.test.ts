// jest hoists mock() calls to the top and these are used in the mocks
const sendMock = jest.fn();
const getSignedUrlMock = jest.fn();
import {
	S3Client,
	CreateMultipartUploadCommand,
	CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { fileDestinationUrlService } from "./fileDestinationUrl.service";
import type * as requestPresignerModule from "@aws-sdk/s3-request-presigner";
import type * as s3Module from "@aws-sdk/client-s3";

jest.mock("@aws-sdk/client-s3", () => {
	const originalS3Module =
		jest.requireActual<typeof s3Module>("@aws-sdk/client-s3");
	return {
		...originalS3Module,
		S3Client: jest.fn(() => ({
			send: sendMock,
		})),
		CreateMultipartUploadCommand: jest.fn(),
		UploadPartCommand: jest.fn(),
		CompleteMultipartUploadCommand: jest.fn(),
	};
});

jest.mock("@aws-sdk/s3-request-presigner", () => {
	const originalRequestPresignerModule = jest.requireActual<
		typeof requestPresignerModule
	>("@aws-sdk/s3-request-presigner");
	return {
		...originalRequestPresignerModule,
		getSignedUrl: getSignedUrlMock,
	};
});

const tenMB = 10 * 1024 * 1024;

describe("startMultipartUpload", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should return key and uploadId on success", async () => {
		const bucket = "test_bucket";
		const fileName = "test.png";
		const path = "/test";
		const uploadId = "test_upload_id";

		sendMock.mockResolvedValue({ UploadId: uploadId });

		const result = await fileDestinationUrlService.startMultipartUpload({
			bucket,
			fileName,
			path,
		});

		expect(S3Client).toHaveBeenCalledWith({});
		expect(CreateMultipartUploadCommand).toHaveBeenCalledWith({
			Bucket: bucket,
			Key: `${path}/${fileName}`,
		});
		expect(sendMock).toHaveBeenCalledWith(
			expect.any(CreateMultipartUploadCommand),
		);
		expect(result).toEqual({ key: expect.any(String) as unknown, uploadId });
	});
});

describe("createMultipartUploadUrls", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should successfully generate URLs", async () => {
		const key = "test_key";
		const fileSizeInBytes = 2.5 * tenMB;
		const urls = ["url1", "url2", "url3"];

		getSignedUrlMock
			.mockResolvedValueOnce(urls[0])
			.mockResolvedValueOnce(urls[1])
			.mockResolvedValueOnce(urls[2]);
		const result = await fileDestinationUrlService.createMultipartUploadUrls({
			bucket: "test",
			key,
			uploadId: "test_upload_id",
			fileSizeInBytes,
			startingPartNumber: 0,
		});

		expect(getSignedUrlMock).toHaveBeenCalledTimes(
			Math.ceil(fileSizeInBytes / tenMB),
		);
		expect(result).toEqual({ urls });
	});
});

describe("completeMultipartUpload", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should send CompleteMultipartUploadCommand", async () => {
		const bucket = "test_bucket";
		const key = "test_key";
		const uploadId = "test_upload_id";
		const parts = [
			{ PartNumber: 1, ETag: "testOne" },
			{ PartNumber: 2, ETag: "testTwo" },
		];
		const uploadUrl = "s3://test-url";

		sendMock.mockResolvedValue({ Location: uploadUrl });

		const result = await fileDestinationUrlService.completeMultipartUpload({
			bucket,
			key,
			uploadId,
			parts,
		});
		expect(CompleteMultipartUploadCommand).toHaveBeenCalledWith({
			Bucket: bucket,
			Key: key,
			UploadId: uploadId,
			MultipartUpload: {
				Parts: parts,
			},
		});
		expect(sendMock).toHaveBeenCalledWith(
			expect.any(CompleteMultipartUploadCommand),
		);
		expect(result).toEqual({ uploadUrl });
	});
});
