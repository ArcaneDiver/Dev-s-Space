import * as path from "path"
import { config } from "dotenv"

config();

export const SERVERS_PATH = path.resolve(__dirname, "../../servers");

export const SOCKET_ROUTE = "/socket";

export const SERVER_CONFIG_PATH = ".space.yml"; 