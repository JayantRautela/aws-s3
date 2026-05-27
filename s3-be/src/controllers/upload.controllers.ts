import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import { s3Client } from "../config/s3.config.js";

const getPresignedUrl = ({ bucket, key }: { bucket: string, key: string }) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key});

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export const handlePresignedUrlRequest = async (req: Request, res: Response) => {
  await getPresignedUrl({ bucket: process.env.S3_BUCKET_NAME!, key: "file1" });
}