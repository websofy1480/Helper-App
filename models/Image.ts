import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
    contentType: String,
  },
  { timestamps: true, collection: "images" }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);
