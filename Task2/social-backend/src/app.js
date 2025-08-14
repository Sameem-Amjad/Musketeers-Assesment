import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/main/index.route.js";
import http from "http";
import expressSession from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan";
import logger from "./utils/common/logger/logger.js";
import ConnectToMongoDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class App {
    constructor() {
        dotenv.config();
        this.app = express();
        this.http = new http.Server(this.app);

        this.PORT = process.env.PORT || 8000;
        this.initMiddleware();
        ConnectToMongoDB();
        this.initRoutes();
    }


    initMiddleware() {

        this.app.use(
            expressSession({
                secret: process.env.SESSION_SECRET || "your-secret-key",
                resave: false,
                saveUninitialized: true,
                cookie: { secure: false },
            })
        );
        this.app.use(morgan("dev"));
        this.app.use((err, req, res, next) => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(err.status || 500).json({ error: err.message });
        });
        this.app.use(cors());
        this.app.use(express.json());
    }

    initRoutes() {
        const publicPath = path.join(__dirname, "..", "public");
        this.app.use(express.static(publicPath));
        this.app.use("/v1/api/", router);
    }

    createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 8000");
        });
    }
}
