import Post from "../../models/posts/post.model.js";
import LikePost from "../../models/likePost/likePost.model.js";
import CommentPost from "../../models/commentPost/commentPost.model.js";
const postService = {
    createPost: async ({ text, image, user }) => {
        try {
            console.log("Creating post:", { text, image, user });
            const post = new Post({ text, image, userId: user, createdBy: user, updatedBy: user });
            await post.save();
            return { success: true, data: post };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getPosts: async () => {
        try {
            const posts = await Post.find().populate("userId", "name");
            return { success: true, data: posts };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getPostById: async (id) => {
        try {
            const post = await Post.findById(id).populate("userId", "name");
            return post ? { success: true, data: post } : { success: false, error: "Post not found" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deletePostById: async (id) => {
        try {
            const result = await Post.findByIdAndDelete(id);
            return result ? { success: true, data: result } : { success: false, error: "Post not found" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getPostsByUserId: async (userId) => {
        try {
            const userPost = await Post.find({ userId }).populate("userId", "name");
            if (userPost.length > 0) {
                return { success: true, data: userPost };
            } else {
                return { success: false, error: "No posts found for this user" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }

    },

    likeAndUnlikePost: async (postId, user) => {
        try {
            let likedPost = await LikePost.findOne({ postId, userId: user }).populate("postId", "text");
            if (likedPost) {
                likedPost.like = !likedPost.like;
                await likedPost.save();
                return { success: true, data: likedPost };
            } else {
                likedPost = new LikePost({ postId, userId: user, like: true });
                await likedPost.save();
                likedPost = await LikePost.findById(likedPost._id).populate("postId", "text");
                return { success: true, data: likedPost };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    addCommentToPost: async (postId, user, text) => {
        try {
            let comment = new CommentPost({ postId, userId: user, text });
            await comment.save();

            return { success: true, data: comment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getAllCommentsOfPost: async (id) => {
        try {
            const comments = await CommentPost.find({ postId: id }).populate("userId", "name profilePictureUrl").select("-__v");
            return comments.length > 0 ? { success: true, data: comments } : { success: false, error: "No comments found for this post" };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    searchPosts: async (query, { limit, page }) => {
        try {
            const posts = await Post.find({ text: { $regex: query, $options: "i" } })
                .limit(limit)
                .skip((page - 1) * limit);
            const total = await Post.countDocuments({ text: { $regex: query, $options: "i" } });
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;

            return { success: true, data: { posts, total, totalPages, hasNextPage } };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

}

export default postService;