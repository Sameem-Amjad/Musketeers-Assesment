import mongoose from "mongoose";

const { Schema } = mongoose;

const likePostSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    like: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const LikePost = mongoose.model("LikePost", likePostSchema);

export default LikePost;
