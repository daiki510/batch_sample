import { cdate } from 'cdate';
import { load } from 'ts-dotenv';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

const env = load({
  BUCKET_NAME: String,
  AWS_PROFILE: String,
  S3_ENDPOINT: String,
});

const s3Client = new S3Client({
  credentials: fromIni({ profile: env.AWS_PROFILE }),
  endpoint: env.S3_ENDPOINT,
});

const uploadObject = async (body: string, date: string) => {
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
        inputParams.Key,
      'Etag: ' + data.ETag
    );
  } catch (err) {
    console.log('Error', err);
  }
};

(async () => {
  console.log('==============start==============');
  //JSONデータの生成
  const currentDate = cdate().format('YYYYMMDDHHmmss');
  const data = {
    title: 'Hello World!!!',
    date: currentDate,
  };
  const json = JSON.stringify(data);

  //S3アップロード
  await uploadObject(json, currentDate);
  console.log('==============end==============');
})();
