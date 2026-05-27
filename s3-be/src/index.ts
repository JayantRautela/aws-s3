import express from "express";
import dotenv from "dotenv";
dotenv.config();
import UploadRouter from "./routes/upload.route.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 3002;

app.use(express.json());

connectDB();

app.use('/api/v1/upload', UploadRouter);

app.listen(PORT, () => {
  console.log("Server started");
});