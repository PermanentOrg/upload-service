import {
  S3Client,
  S3ClientConfig,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fileDestinationUrlService } from './fileDestinationUrl.service';

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(),
  CreateMultipartUploadCommand: jest.fn(),
  UploadPartCommand: jest.fn(),
  CompleteMultipartUploadCommand: jest.fn(),
}));
jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

const tenMB = 10 * 1024 * 1024;

describe('startMultipartUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return key and uploadId on success', async () => {
    const bucket = 'test_bucket';
    const fileName = 'test.png';
    const path = '/test';
    const uploadId = 'test_upload_id';

    const clientMock = {
      send: jest.fn().mockResolvedValue({ UploadId: uploadId }),
    };
    (S3Client as jest.MockedClass<typeof S3Client>).mockImplementation(
      (configuration: S3ClientConfig) => clientMock as unknown as S3Client,
    );

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
    expect(clientMock.send).toHaveBeenCalledWith(
      expect.any(CreateMultipartUploadCommand),
    );
    expect(result).toEqual({ key: expect.any(String), uploadId });
  });
});

describe('createMultipartUploadUrls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully generate URLs', async () => {
    const bucket = 'test_bucket';
    const key = 'test_key';
    const uploadId = 'test_upload_id';
    const fileSizeInBytes = 2.5 * tenMB;
    const urls = ['url1', 'url2', 'url3'];

    (S3Client as jest.MockedClass<typeof S3Client>).mockImplementation(
      (configuration: S3ClientConfig) => ({} as unknown as S3Client),
    );
    (getSignedUrl as jest.MockedFunction<typeof getSignedUrl>)
      .mockResolvedValueOnce(urls[0])
      .mockResolvedValueOnce(urls[1])
      .mockResolvedValueOnce(urls[2]);
    const result = await fileDestinationUrlService.createMultipartUploadUrls({
      bucket: 'test',
      key,
      uploadId: 'test_upload_id',
      fileSizeInBytes,
    });

    expect(S3Client).toHaveBeenCalledWith({});
    expect(getSignedUrl).toHaveBeenCalledTimes(
      Math.ceil(fileSizeInBytes / tenMB),
    );
    expect(result).toEqual({ urls });
  });
});

describe('completeMultipartUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send CompleteMultipartUploadCommand', async () => {
    const bucket = 'test_bucket';
    const key = 'test_key';
    const uploadId = 'test_upload_id';
    const parts = [
      { PartNumber: 1, ETag: 'testOne' },
      { PartNumber: 2, ETag: 'testTwo' },
    ];
    const uploadUrl = 's3://test-url';

    const clientMock = {
      send: jest.fn().mockResolvedValue({ Location: uploadUrl }),
    };
    (S3Client as jest.MockedClass<typeof S3Client>).mockImplementation(
      (configuration: S3ClientConfig) => clientMock as unknown as S3Client,
    );

    const result = await fileDestinationUrlService.completeMultipartUpload({
      bucket,
      key,
      uploadId,
      parts,
    });
    expect(S3Client).toHaveBeenCalledWith({});
    expect(CompleteMultipartUploadCommand).toHaveBeenCalledWith({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    });
    expect(clientMock.send).toHaveBeenCalledWith(
      expect.any(CompleteMultipartUploadCommand),
    );
    expect(result).toEqual({ uploadUrl });
  });
});
