import { createServer } from "http"
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import socket_io from "socket.io"

import router from "./routes"

import { Servers } from './lib/servers';
import { Socket } from './lib/socket';


const app = express();


// Middlewares
app.use(cors())
app.use(helmet());
app.use(morgan("tiny"));



// Routes
app.use(router);

const http = createServer(app);
const io = socket_io(http);


// Init core
Servers.getInstance().init();
Socket.getInstance().init(io);


export default http;