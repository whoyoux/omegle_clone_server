import { Server } from "./server";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const server = new Server();

    server.listen((port) => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
}

main().catch(console.error);
