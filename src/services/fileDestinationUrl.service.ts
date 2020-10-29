import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export interface CreateFileDestinationUrlParams {
  bucket: string;
  fileName: string;
  fileType: string;
  maxSize: number;
  path: string;
}

export interface CreateFileDestinationUrlResponse {
  destinationUrl: string;
  presignedPost: S3.PresignedPost;
}

/**
 * This helper method will generate a presigned post.
 *
 * @param  {S3.PresignedPost.Params}   s3Params The parameters to pass to S3.
 * @return {Promise<S3.PresignedPost>}          The resulting presigned post.
 */
const createPresignedPost = async (
  s3Params: S3.PresignedPost.Params,
): Promise<S3.PresignedPost> => {
  const s3 = new S3();
  // This does NOT use the callback variation of createPresignedPost due to a bug in the aws sdk.
  // The downside is that this means credentials cannot be provided via IAM, and must be provided
  // directly. Once the sdk bug is fixed, we would like to use the callback approach.
  // https://github.com/aws/aws-sdk-js/issues/3486
  //
  // When we do eventually implement the callback approach, please note this additional bug:
  // The callback types need to be manually overridden to allow for null as well as Error, due
  // to a bug in the AWS SDK type definitions.
  // https://github.com/aws/aws-sdk-js/issues/3055
  return new Promise<S3.PresignedPost>((resolve) => {
    resolve(s3.createPresignedPost(s3Params));
  });
};

const createFileDestinationUrl = async ({
  bucket,
  fileType,
  maxSize,
  fileName = '',
  path = '',
}: CreateFileDestinationUrlParams): Promise<CreateFileDestinationUrlResponse> => {
  const key = `${path}/${fileName || uuidv4()}`;
  const s3Params = {
    Bucket: bucket,
    Fields: {
      Key: key,
    },
    Expires: 3600,
    Conditions: [
      ['eq', '$Content-Type', fileType],
      ['content-length-range', 0, maxSize],
    ],
  };
  const presignedPost = await createPresignedPost(s3Params);
  return {
    destinationUrl: `https://${bucket}.s3.amazonaws.com/${key}`,
    presignedPost,
  };
};

export const fileDestinationUrlService = {
  createFileDestinationUrl,
};
