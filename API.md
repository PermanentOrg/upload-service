# API Documentation

- Path: `<host>/api`

## Endpoints

### GET `/health`

- Response Body

```
{
  "status": "available" | "unavailable",
  "message": "string"
}
```

### POST `/fileDestinationUrl`

- Headers: Content-Type: application/json
- Request Body

```
{
  "bucket": "string" (the S3 bucket to which to upload the file),
  "fileName": "string" (optional),
  "fileType": "string",
  "maxSize": number (called "maxSize" but means "file size" in practice),
  "path": "string" (the path to the directory in S3 where the file should be stored)
}
```

- Response Body

```
{
  "destinationUrl": "string" (URL),
  "presignedPost": "string" (URL)
}
```

### POST `/startMultipartUpload`

- Headers: Content-Type: application/json
- Request Body

```
{
  "bucket": "string" (the S3 bucket to which to upload the file),
  "fileName": "string" (optional),
  "path": "string" (the path to the directory in S3 where the file should be stored)
}
```

- Response Body

```
{
  "key": "string",
  "uploadId": "string"
}
```

### POST `/multipartUploadUrls`

- Notes: This can be used to generate all the URLs for all parts of the file if you know the size in advance. If you
  don't, you can use this endpoint to generate one URL at a time. In this case, call this endpoint for each "chunk" of the
  file, where chunks must be less than 10 MB, and all but the last chunk must be greater than 5 MB.
- Headers: Content-Type: application/json
- Request Body

```
{
  "bucket": "string" (the S3 bucket to which to upload the file),
  "key": "string" (from `/startMultipartUpload`),
  "uploadId": "string" (from `/startMultipartUpload`),
  "fileSizeInBytes": number,
  "startingPartNumber": number (minimum value 1)
}
```

- Response Body

```
{
  "urls": ["string"] (URLs)
}
```

### POST `/completeMultipartUpload`

- Headers: Content-Type: application/json
- Request Body

```
{
  "bucket": "string" (the S3 bucket to which to upload the file),
  "key": "string" (from `/startMultipartUpload`),
  "uploadId": "string" (from `/startMultipartUpload`),
  "parts": [{
    "PartNumber": number,
    "ETag": "string" (this will come from hitting the URLs returned by `/multipartUploadUrls`)
  }]
}
```

- Response Body

```
{
  "uploadUrl": "string" (URL where the file can be found)
}
```
