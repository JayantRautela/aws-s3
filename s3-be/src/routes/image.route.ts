import { Router } from "express";
import { getImages } from "../controllers/image.controller.js";

const router = Router();

router.get('/get-images', getImages);

export default router;