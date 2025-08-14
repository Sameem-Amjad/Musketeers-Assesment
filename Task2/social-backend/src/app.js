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
import { Server } from "socket.io";
import initSocket from "./sockets/index.socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class App {
    constructor() {
        dotenv.config();
        this.app = express();
        this.http = new http.Server(this.app);
        this.initMiddleware();
        this.io = new Server(this.http, {
            maxHttpBufferSize: 100 * 1024 * 1024,
            withCredentials: true,
            transports: ["websocket", "polling"],
            cors: {
                origin: ["http://127.0.0.1:8000", "*"],
            },
        });


        this.PORT = process.env.PORT || 8000;
        this.initSocketIO();
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

    initSocketIO() {
        initSocket(this.io);
    }


    createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 8000");
        });
    }
}
