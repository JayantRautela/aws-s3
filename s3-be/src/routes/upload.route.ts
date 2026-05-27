import { Router } from "express";
import { handlePresignedUrlRequest } from "../controllers/upload.controllers.js";

const router = Router();

router.post('/get-presigned-url', handlePresignedUrlRequest);

export default router;