import {
  validateCreateFileDestinationUrlParams,
  validateStartMultipartUploadParams,
  validateCreateMultipartUploadUrlParams,
  validateCompleteMultipartUploadParams,
} from "./validateFileDestinationUrlParams";

describe("validateCreateFileDestinationUrlParams", () => {
  test("should raise no error if input is valid", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).toBeNull();
    }
  });
  test("should raise an error if bucket is missing", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too short", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "t",
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too long", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is wrong type", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: 1,
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileName is too long", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileName is wrong type", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: 1,
        fileType: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileType is missing", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileType wrong type", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: 1,
        maxSize: 1024,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if maxSize is missing", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if maxSize is too small", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: "test",
        maxSize: 0,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if maxSize is wrong type", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: "test",
        maxSize: [1024],
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if path is wrong type", () => {
    let error = null;
    try {
      validateCreateFileDestinationUrlParams({
        bucket: "test",
        fileName: "test",
        fileType: "test",
        maxSize: 1024,
        path: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
});

describe("validateStartMultipartUploadParams", () => {
  test("should raise no error if input is valid", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: "test",
        fileName: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).toBeNull();
    }
  });
  test("should raise an error if bucket is missing", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        fileName: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is wrong type", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: 1,
        fileName: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too short", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: "t",
        fileName: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too long", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        fileName: "test",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileName is wrong type", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: "test",
        fileName: 1,
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileName is too long", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: "test",
        fileName:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        path: "/test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if path is wrong type", () => {
    let error = null;
    try {
      validateStartMultipartUploadParams({
        bucket: "test",
        fileName: "test",
        path: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
});

describe("validateCreateMultipartUploadUrlParams", () => {
  test("should raise no error if input is valid", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).toBeNull();
    }
  });
  test("should raise an error if bucket is missing", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too short", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "t",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too long", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is wrong type", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: 1,
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if key is missing", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if key is wrong type", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: 1,
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileSizeInBytes is missing", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileSizeInBytes is too small", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 0,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if fileSizeInBytes is wrong type", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: [1024],
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if uploadId is missing", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if uploadId is wrong type", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: 1,
        fileSizeInBytes: 1024,
        startingPartNumber: 1,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if startingPartNumber is missing", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if startingPartNumber is wrong type", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: [1],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if startingPartNumber is too small", () => {
    let error = null;
    try {
      validateCreateMultipartUploadUrlParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        fileSizeInBytes: 1024,
        startingPartNumber: 0,
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
});

describe("validateCompleteMultipartUploadParams", () => {
  test("should raise no error if input is valid", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).toBeNull();
    }
  });
  test("should raise an error if bucket is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: 1,
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too short", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "t",
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if bucket is too long", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket:
          "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if key is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if key is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: 1,
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if uploadId is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if uploadId is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: 1,
        parts: [
          { PartNumber: 1, ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: "test",
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts.PartNumber is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: [{ ETag: "testOne" }, { PartNumber: 2, ETag: "testTwo" }],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts.PartNumber is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: [1], ETag: "testOne" },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts.ETag is missing", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: [{ PartNumber: 1 }, { PartNumber: 2, ETag: "testTwo" }],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
  test("should raise an error if parts.ETag is wrong type", () => {
    let error = null;
    try {
      validateCompleteMultipartUploadParams({
        bucket: "test",
        key: "test",
        uploadId: "test",
        parts: [
          { PartNumber: 1, ETag: 1 },
          { PartNumber: 2, ETag: "testTwo" },
        ],
      });
    } catch (err) {
      error = err;
    } finally {
      expect(error).not.toBeNull();
    }
  });
});
