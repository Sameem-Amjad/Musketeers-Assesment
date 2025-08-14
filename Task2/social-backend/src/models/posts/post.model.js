import mongoose from "mongoose";

const { Schema } = mongoose;
const postSchema = new Schema({
    text: { type: String, required: true, maxlength: 280 },
    image: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;