import { WS_PORT } from "./config";
import { Server } from "./ws/server";

const server = new Server();
server.listen(Number(WS_PORT));
