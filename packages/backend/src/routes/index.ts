import { Router } from "express"

import { clone } from "../lib/git utils"
import { Socket } from '../lib/socket';
import { Servers } from "../lib/servers";

import serversRouter from "./servers"

const router = Router();

router.use("/servers", serversRouter);



export default router;