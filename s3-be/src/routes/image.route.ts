import { Router } from "express";
import { getImageById, getImages } from "../controllers/image.controller.js";

const router = Router();

router.get('/get-images', getImages);
router.get('/get-image/:id', getImageById);

export default router;