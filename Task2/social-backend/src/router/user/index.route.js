import express from "express";
import { errorHandler } from "../../handler/errorHandlers.js";
import postController from "../../controller/posts/index.controller.js";
import { authGuard } from "../../middleware/auth.middleware.js"

const userRouter = express.Router();

userRouter.get("/:id/posts", authGuard(), errorHandler(postController.getUserPosts));

export default userRouter