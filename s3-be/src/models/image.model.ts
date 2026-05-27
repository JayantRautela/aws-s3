import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true,
    // unique: true
  },
  originalName: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Image = mongoose.model('Image', imageSchema);