import mongoose from "mongoose";

const multipleImageSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
    contentType: String,
  },
  { timestamps: true }
);

export default mongoose.models.MultipleImage || mongoose.model("MultipleImage", multipleImageSchema);