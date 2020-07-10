import { createServer } from "http"
import express, { Request, Response } from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import socket_io from "socket.io"

import router from "./routes"
import serverRouter from "./routes/servers"

import { Servers } from './lib/servers';
import { Socket } from './lib/socket';
import { SOCKET_ROUTE } from "./lib/env"

const app = express();


// Middlewares
app.use(helmet());
app.use(cors())
app.use(morgan("tiny", {
        //skip: (req: Request, res: Response) => req.url.split("/")[1] === SOCKET_ROUTE.split("/")[1]
}));
app.use(express.json());


// Routes
app.use(router);

const http = createServer(app);
const io = socket_io(http, {
       // path: SOCKET_ROUTE
});


// Init core
Servers.getInstance().init(serverRouter);
Socket.getInstance().init(io);


export default http;