import * as path from "path"
import { config } from "dotenv"

config();

export const SERVERS_PATH = path.resolve(__dirname + "../../../servers");

console.log(SERVERS_PATH, __dirname)