import express from "express";
import { errorHandler } from "../../handler/errorHandlers.js";
import postController from "../../controller/posts/index.controller.js";
import { authGuard } from "../../middleware/auth.middleware.js"
import userController from "../../controller/user/index.controller.js";

const userRouter = express.Router();

userRouter.get("/:id/posts", authGuard(), errorHandler(postController.getUserPosts));
userRouter.get("/friend-suggestion", authGuard(), errorHandler(userController.getFriendSuggestions));
export default userRouter;