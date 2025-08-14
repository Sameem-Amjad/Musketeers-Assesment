import express from "express";
import { errorHandler } from "../../handler/errorHandlers.js";
import authController from "../../controller/auth/index.controller.js";
import { authGuard } from "../../middleware/auth.middleware.js"
const authRouter = express.Router();

authRouter.post("/register", errorHandler(authController.createUser))

authRouter.post("/login", errorHandler(authController.loginUser));

authRouter.get("/me", authGuard(), errorHandler(authController.getUser));

authRouter.patch("/profile", authGuard(), errorHandler(authController.updateUser));

export default authRouter