import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

export class Server {
    private httpServer!: HTTPServer;
    private app!: Application;
    private io!: SocketIOServer;

    private readonly DEFAULT_PORT = 5000;

    private readonly CORS_ORIGIN =
        process.env.NODE_ENV === "production"
            ? "https://omegle-clone-whx.vercel.app/"
            : "http://localhost:3000";

    constructor() {
        console.log(`Cors origin: ${this.CORS_ORIGIN}`);
        this.initialize();

        this.configureApp();

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);

        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: this.CORS_ORIGIN,
            },
        });
    }

    private configureApp(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.json({ message: `Hello World from ${req.hostname}` });
        });
    }

    private handleSocketConnection(): void {
        this.io.on("connection", (socket) => {
            console.log(`Socket connected. ${socket.id}`);

            socket.on("disconnect", () => {
                console.log("Socket disconnected.");
            });
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }
}
