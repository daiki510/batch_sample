import { cdate } from 'cdate';
import { s3Helper } from './helpers/s3-helper';

(async () => {
  //JSONデータの生成
  const currentDate = cdate().format('YYYYMMDDHHmmss');
  const data = {
    title: 'Hello World!!!',
    date: currentDate,
  };
  const json = JSON.stringify(data);
  console.debug(json);

  //S3アップロード
  await s3Helper.uploadObject(json, currentDate);

  // await s3Helper.listBuckets();
})();
