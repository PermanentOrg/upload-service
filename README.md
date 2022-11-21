![unit tests](https://github.com/PermanentOrg/upload-service/workflows/unit%20tests/badge.svg)
# Permanent.org Upload Service

The upload service is responsible for handling upload requests.

It does not process files, but it does provides the client with the needed information to upload to S3 directly.

## Structure

```
- docs         // API documentation
- src
|- controllers // maps between routes to services
|- routes      // endpoint definitions
|- services    // business logic
```

## Usage

1. Install npm packages.

```
npm install
```

2. [Configure AWS credentials.](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)

These credentials should be associated with an account that has `s3:PutObject` access to the bucket objects you would like API clients to be able to write to.

An example custom policy:

```
{
    "Statement": [
        {
            "Action": [
                "s3:PutObject"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::MyBucketNameGoesHere/*"
            ]
        }
    ]
}
```

3. Configure Sentry

If you want to use Sentry, you must pass environment variables containing the [Sentry DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer/) and the [Sentry environment](https://docs.sentry.io/product/sentry-basics/environments/) that you will use for this project.

**.env**
```
export SENTRY_DSN="https://your@dsn.ingest.sentry.io/here"
export SENTRY_ENVIRONMENT=local
```

3. Start the project.

```
npm start
```

4. Check health.

```
curl localhost:3000/api/health
```

Should output:

```
{"status":"available","message":"OK"}
```

## Running with Docker

- `cp .env.example .env` and set correct AWS credentials
- `docker-compose up` or `sudo docker-compose up --build` to force rebuild after first run.
- See [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Endpoints

### GET /api/health
#### Input
No inputs.

#### Output
Returns a health check.

- `status`: either `available` or `unavailable`.
- `message`: a more detailed explanation about the health status.

### POST /api/fileDestinationUrl
#### Input
##### Required

- `bucket`: the AWS S3 bucket the file will be passed to (e.g. `permanent-local`).
- `fileType`: the mime type of the file being uploaded (e.g. `image/png`),
- `maxSize`: the maximum file size that the destination should accept,

##### Optional

- `fileName`: the destination file name within the bucket.
- `path`: the destination path within the bucket.

#### Output
- `destinationUrl`: the URL that will ultimately hold the file once it has been uploaded.
- `presignedPost`: an AWS S3 presigned post which will accept the file.  This post will contain:
  - `url`: the URL that the file should be POSTed to.
  - `fields`: an array of fields which must be submitted as part of the POST body. These fields must appear before the file content itself.

## Contributing

Contributors to this repository agree to adhere to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). To report violations, get in touch with engineers@permanent.org.

## Security

Found a vulnerability? Report this and any other security concerns to engineers@permanent.org.

## License

This code is free software licensed as [AGPLv3](LICENSE), or at your
option, any final, later version published by the Free Software
Foundation.
