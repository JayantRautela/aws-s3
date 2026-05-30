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

export const getImageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required to fetch image"
      });
    }

    const image = await Image.findById(id);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image to show"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image fetched successfully",
      data: {
        image: image
      }
    });
  } catch (error) {
    console.log("Error in getting the iamges :- ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}