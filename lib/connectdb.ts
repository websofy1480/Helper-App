import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(uri);
    console.log("CONNECTED DATABASE 👉", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

