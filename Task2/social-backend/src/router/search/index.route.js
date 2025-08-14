import express from "express";
import { errorHandler } from "../../handler/errorHandlers.js";

import { authGuard } from "../../middleware/auth.middleware.js"
import postController from "../../controller/posts/index.controller.js";
import userController from "../../controller/user/index.controller.js";

const searchRouter = express.Router();

searchRouter.get("/users", authGuard(), errorHandler(userController.searchUsers));

searchRouter.get("/posts", authGuard(), errorHandler(postController.searchPosts));



export default searchRouter