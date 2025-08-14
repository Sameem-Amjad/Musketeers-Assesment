import express from "express";
import { errorHandler } from "../../handler/errorHandlers.js";
import postController from "../../controller/posts/index.controller.js";
import { authGuard } from "../../middleware/auth.middleware.js"
const postRouter = express.Router();

postRouter.post("/", authGuard(), errorHandler(postController.createPost));
postRouter.get("/", authGuard(), errorHandler(postController.getPosts));
postRouter.get("/:id", authGuard(), errorHandler(postController.getPost));
postRouter.delete("/:id", authGuard(), errorHandler(postController.deletePost));
postRouter.post("/:id/like", authGuard(), errorHandler(postController.likeAndUnlikePost));
postRouter.post("/:id/comments", authGuard(), errorHandler(postController.addCommentToPost));
postRouter.get("/:id/comments", authGuard(), errorHandler(postController.getAllCommentsOfPost));



export default postRouter;