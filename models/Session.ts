import { Schema, Types, model, models } from "mongoose";


const SessionSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    tabId: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

export default models.Session || model("Session", SessionSchema);