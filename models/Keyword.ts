import mongoose from "mongoose";
import "./Category"

const KeywordSchema = new mongoose.Schema(
    {
        keywords: { type: [String], default: []}
    },
    { timestamps: true }
);

export default mongoose.models.Keyword || mongoose.model("Keyword", KeywordSchema);
