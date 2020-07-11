import { spawn } from "child_process"

import { processToGenerator } from "./generators"
import { Servers } from './servers';


export const clone = (url: string, name: string) => {
        const process = spawn("git", ["clone", url, Servers.resolveServerPath(name)]);

        return processToGenerator(process);
}