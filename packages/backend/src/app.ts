import * as express from "express"
import * as morgan from "morgan"
import * as helmet from "helmet"
import * as cors from "cors"

import router from "./routes"

import Servers from './lib/servers';


const app = express();


// Middlewares

app.use(cors())
app.use(helmet());
app.use(morgan("dev"));


// Routes

app.use(router);

Servers.getInstance().init();

export default app;