import type { Request, Response } from "express";
import { Image } from "../models/image.model.js";

export const getImages = async (req: Request, res: Response) => {
  try {
    const images = await Image.find();

    return res.status(200).json({
      success: true,
      message: "Images fetched successfully",
      data: {
        images
      }
    });
  } catch (error) {
    console.log("Error in getting all the iamges :- ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}