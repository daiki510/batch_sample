// Ref:https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
import { load } from 'ts-dotenv';
import {
  GetObjectCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

const env = load({
  BUCKET_NAME: String,
  AWS_PROFILE: String,
});

const s3Client = new S3Client({
  credentials: fromIni({ profile: env.AWS_PROFILE }),
});

export const listBuckets = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log('Success', data.Buckets);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};

export const getObject = async (date?: string): Promise<string | undefined> => {
  try {
    const bucketParams = {
      Bucket: env.BUCKET_NAME,
      Key: `${date}_comic_list.json`,
    };
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    return (await data.Body?.transformToString()) ?? '';
  } catch (err) {
    console.log('Error', err);
  }
};

export const uploadObject = async (body: string, date: string) => {
  try {
    const inputParams = {
      Bucket: env.BUCKET_NAME,
      Key: `${date}_sample.json`,
      Body: body,
    };
    const data = await s3Client.send(new PutObjectCommand(inputParams));
    console.log(
      'Successfully uploaded object: ' +
        inputParams.Bucket +
        '/' +
        inputParams.Key
    );
    console.debug('==============data==============');
    console.debug(data);
  } catch (err) {
    console.log('Error', err);
  }
};
