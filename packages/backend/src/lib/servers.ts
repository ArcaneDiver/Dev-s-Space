import * as path from 'path';
import { promises as fs } from "fs"
import { Router } from 'express';

import { SERVERS_PATH } from "./env"
import { ServerAlreadyExists, StdError } from './errors';
import { clone } from "./git utils"
import { Socket } from './socket';
import { handleErrorFromGenerator } from "./generators"

export interface IServer {
        name: string,
        path: string
}

export class Servers {
        
        public static readonly PATH: string = SERVERS_PATH
        private static INSTANCE: Servers;
        

        private _servers: IServer[];
        private _serversRoute: Router;

        private constructor() {
                this._servers = [];
        }

        public static getInstance(): Servers {
                if (!this.INSTANCE) 
                        this.INSTANCE = new Servers();
                
                return this.INSTANCE;
        }

        public static resolveServerPath(repoName: string) {
                return path.resolve(this.PATH, repoName);
        }


        public async init(serversRoute: Router) {
                
                console.log("Initializing");
                
                this._serversRoute = serversRoute;

                
                const folders = await this.readServerDir();
                
                folders.forEach((folder, i) => this._servers[i] = {
                        name: folder,
                        path: Servers.resolveServerPath(folder)
                });

                console.log(` ${folders.length} folder founded`, folders);


        }

        public get servers() {
                return this._servers;
        }

        public async addNewServer(url: string, name: string) {
                console.log("Adding new server started");
                
                this.checkServerNameExists(name);

                try {
                        await this.cloneServer(url, name);
                } catch (e) {
                        console.error(e instanceof StdError ? " [STDERROR] Error in the process" : " [ERROR] Unknown Error");

                        return;
                }


        }
        
        private async readServerDir() {
                return await fs.readdir(Servers.PATH);
        }

        private checkServerNameExists(name: string) {
                if (this._servers.find(s => s.name === name))
                        throw new ServerAlreadyExists();
        }

        private async cloneServer(url: string, name: string) {
                console.log("Cloning server", name);

                const generator = clone("https://github.com/ArcaneDiver/gesco-MediaPonderata", name);

                const generatorWhichHandleErrors = handleErrorFromGenerator(generator);

                await Socket.getInstance().sendStdOutWithSocket(generatorWhichHandleErrors, name);
        }
}