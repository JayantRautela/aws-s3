import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import { s3Client } from "../config/s3.config.js";
import { v4 as uuid } from "uuid";
import { Image } from "../models/image.model.js";

const getPresignedUrl = ({ bucket, key }: { bucket: string, key: string }) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key});

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export const handlePresignedUrlRequest = async (req: Request, res: Response) => {
  try {
    const { mime, fileExtension } = req.body;

    const name = uuid();
    const fileName = `${name}-${mime}`;

    const url = await getPresignedUrl({ bucket: process.env.S3_BUCKET_NAME!, key: fileName });

    return res.status(200).json({
      success: true,
      data: {
        url: url,
        fileName: fileName
      }
    });
  } catch (error) {
    console.log("Error in generating pre-signed url");
    return res.status(500).json({
      success: false,
      message: "INternal Server Error"
    });
  }
}

export const upload = async (req: Request, res: Response) => {
  try {
    const { name, description, fileName } = req.body;

    const image = await Image.create({
      name: name,
      description: description,
      fileName: fileName
    });

    res.status(200).json({
      success: true,
      message: "IMage updated successfully"
    });
  } catch (error) {
    console.log("Error in uploading image");
    return res.status(500).json({
      success: false,
      message: "INternal Server Error"
    });
  }
}