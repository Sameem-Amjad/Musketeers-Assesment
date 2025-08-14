import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const commentPostSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CommentPost = mongoose.model("CommentPost", commentPostSchema);

export default CommentPost;