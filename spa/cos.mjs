// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
import COS from "cos-nodejs-sdk-v5";
import { createReadStream } from "fs";
import { resolve } from "path";
import PQueue from "p-queue";
import readdirp from "readdirp";
import dotenv from "dotenv";
dotenv.config();
const SecretId = process.env.SECRET_ID;
const SecretKey = process.env.SECRET_KEY;
const Bucket = process.env.BUCKET;
const Region = process.env.REGION;
const queue = new PQueue({ concurrency: 10 });
const cos = new COS({
  SecretId,
  SecretKey,
});
// 判断文件在桶中是否存在
function isExistObject(objName) {
  cos.headObject(
    {
      Bucket /* 必须 */,
      Region/* 必须 */,
      Key: objName /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
    },
    function (err, data) {
      if (data) {
        console.log("对象存在");
        return false;
      } else if (err.statusCode == 404) {
        console.log("对象不存在");
        return true;
      } else if (err.statusCode == 403) {
        console.log("没有该对象读权限");
      }
    }
  );
}
// // objectName: static/css/main.079c3a.css
// // withHash: 该文件名是否携带 hash 值
async function uploadFile(objectName, withHash = false) {

  const file = resolve("./dist", objectName);
  // 如果路径名称不带有 hash 值，则直接重新上传 -> 此处可优化 
  const exist = withHash ? await isExistObject(objectName) : false;
  console.log('对象存在?',exist)
  if (!exist) {
    const cacheControl = withHash ? "max-age=31536000" : "no-cache";
    // 为了加速传输速度，这里使用 stream
    await cos.putObject(
      {
        Bucket,
        Region,
        Key: objectName,
        StorageClass: "STANDARD",
        Body: createReadStream(file), // 上传文件对象
        Headers: {
          cacheControl: cacheControl,
        },
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        console.log(err || data);
      }
    );
    console.log(`Done: ${objectName}`);
  } else {
    // 如果该文件在 OSS 已存在，则跳过该文件 (Object)
    console.log(`Skip: ${objectName}`);
  }
}
async function main() {
  // 首先上传不带 hash 的文件
  for await (const entry of readdirp("./dist", { depth: 0, type: "files" })) {
    queue.add(() => uploadFile(entry.path));
  }
  // 上传携带 hash 的文件
  for await (const entry of readdirp("./dist/assets", { type: "files" })) {
    queue.add(() => uploadFile(`assets/${entry.path}`, true));
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
