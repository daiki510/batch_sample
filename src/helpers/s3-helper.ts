// Ref:https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
import { load } from 'ts-dotenv';
import {
  Bucket,
  GetObjectCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const env = load({
  BUCKET_NAME: String,
  S3_ENDPOINT: String,
});

class S3Helper {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      credentials: defaultProvider(),
      endpoint: env.S3_ENDPOINT,
      region: 'ap-northeast-1',
    });
  }

  /**
   * バケット一覧の取得
   */
  async listBuckets(): Promise<Bucket[] | undefined> {
    try {
      const data = await this.s3Client.send(new ListBucketsCommand({}));
      console.log('Success', data.Buckets);
      return data.Buckets;
    } catch (err) {
      console.log('Error', err);
    }
  }

  /**
   * オブジェクトの取得
   */
  async getObject(key: string): Promise<string | undefined> {
    try {
      const bucketParams = {
        Bucket: env.BUCKET_NAME,
        Key: key,
      };
      const data = await this.s3Client.send(new GetObjectCommand(bucketParams));
      return (await data.Body?.transformToString()) ?? '';
    } catch (err) {
      console.log('Error', err);
    }
  }

  /**
   * オブジェクトのアップロード
   */
  async uploadObject(body: string, date: string): Promise<void> {
    try {
      const bucketParams = {
        Bucket: env.BUCKET_NAME,
        Key: `${date}_comic_list.json`,
        Body: body,
      };
      const data = await this.s3Client.send(new PutObjectCommand(bucketParams));
      console.log(
        'Successfully uploaded object: ' +
          bucketParams.Bucket +
          '/' +
          bucketParams.Key,
        'Etag: ' + data.ETag
      );
    } catch (err) {
      console.log('Error', err);
    }
  }
}

export const s3Helper = new S3Helper();
