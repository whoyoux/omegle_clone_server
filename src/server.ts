import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export class Server {
    private httpServer!: HTTPServer;
    private app!: Application;
    private io!: SocketIOServer;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();

        this.configureApp();

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);

        //Need to change that!
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: "*",
            },
        });
    }

    private configureApp(): void {
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
            console.log("Socket connected.");
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }
}
