import { spawn } from "child_process"

import { processToGenerator } from "./generators"

import { SERVERS_PATH } from "./env";

export const clone = (url: string) => {
        const process = spawn("git", ["clone", url, SERVERS_PATH]);

        return processToGenerator(process);
}