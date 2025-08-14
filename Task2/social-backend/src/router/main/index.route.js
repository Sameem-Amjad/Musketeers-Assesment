import express from "express";
import { dataResponse } from "../../utils/response/response.js";
import authRouter from "../auth/index.route.js";
import postRouter from "../post/index.route.js";
import userRouter from "../user/index.route.js";
const router = express.Router();
router.get("/", (req, res) => {
    res.status(201).json(dataResponse("welcome to social app api", null, 201));
})
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);



export default router;