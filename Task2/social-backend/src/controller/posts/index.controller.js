import postService from "../../service/posts/index.service.js";
import { dataResponse, errorResponse } from "../../utils/response/response.js"

const postController = {
    createPost: async (req, res) => {
        try {
            const user = req.user;
            const { text, image } = req.body;
            if (!text) {
                return res.status(400).json(errorResponse("Text is required", 400));
            }

            const resBody = await postService.createPost({ text, image, user });
            if (resBody.success) {
                res.status(201).json(dataResponse("Post created successfully", resBody.data, 201));
            } else {
                res.status(400).json(errorResponse(resBody.error || "Failed to create post", 400));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await postService.getPosts();
            if (posts.success) {
                res.status(200).json(dataResponse("Posts retrieved successfully", posts.data, 200));
            } else {
                res.status(400).json(errorResponse(posts.error || "Failed to retrieve posts", 400));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    getPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await postService.getPostById(postId);
            if (post) {
                res.status(20).json(dataResponse("Post retrieved successfully", post, 200));
            } else {
                res.status(404).json(errorResponse("Post not found", 404));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const result = await postService.deletePostById(postId);
            if (result.success) {
                res.status(200).json(dataResponse("Post deleted successfully", result.data, 200));
            } else {
                res.status(404).json(errorResponse("Post not found", 404));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    }
    ,

    getUserPosts: async (req, res) => {
        try {
            const userId = req.params.id;
            const posts = await postService.getPostsByUserId(userId);
            if (posts.success) {
                res.status(200).json(dataResponse("User posts retrieved successfully", posts.data, 200));
            } else {
                res.status(404).json(errorResponse("User posts not found", 404));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    likeAndUnlikePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const user = req.user;
            const result = await postService.likeAndUnlikePost(postId, user);
            if (result.success) {
                if (result.data.like) {
                    res.status(200).json(dataResponse("Post liked successfully", result.data, 200));
                } else {
                    res.status(200).json(dataResponse("Post unliked successfully", result.data, 200));
                }
            } else {
                res.status(404).json(errorResponse("Post not found", 404));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    addCommentToPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const user = req.user;
            const { text } = req.body;

            const result = await postService.addCommentToPost(postId, user, text);
            if (result.success) {
                res.status(201).json(dataResponse("Comment added successfully", result.data, 201));
            } else {
                res.status(400).json(errorResponse(result.error || "Failed to add comment", 400));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    getAllCommentsOfPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const comments = await postService.getAllCommentsOfPost(postId);
            if (comments.success) {
                res.status(200).json(dataResponse("Post comments retrieved successfully", comments.data, 200));
            } else {
                res.status(404).json(errorResponse("Post comments not found", 404));
            }
        } catch (error) {
            return res.status(500).json(errorResponse(error.message || "Internal Server Error", 500));
        }
    },

    searchPosts: async (req, res) => {
        const { q, limit, page } = req.query;

        try {
            const resBody = await postService.searchPosts(q, { limit, page });
            if (resBody.success) {
                res.status(200).json(dataResponse("Posts found successfully", resBody.data, 200));
            } else {
                res.status(404).json(dataResponse("No posts found", null, 404));
            }
        } catch (error) {
            res.status(500).json(dataResponse("Error searching posts", null, 500));
        }
    }
}

export default postController;