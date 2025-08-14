import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema(
    {
        participants: [
            { type: Schema.Types.ObjectId, ref: "User", required: true },
        ], // Array of two users for 1-1 chat
        messages: [
            {
                sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
                content: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                read: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
