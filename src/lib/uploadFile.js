import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile({ Body, Dir }) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const Key = Body.name;
  const ContentType = Body.type;

  const command = new PutObjectCommand({
    Bucket: "melancong-devcrew",
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log("s3 succes ", res);
  } catch (error) {
    console.log(error);
  }
}
