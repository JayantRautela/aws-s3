import { Router } from "express";
import { handlePresignedUrlRequest, upload } from "../controllers/upload.controllers.js";

const router = Router();

router.post('/get-presigned-url', handlePresignedUrlRequest);
router.post('/image', upload);

export default router;