import * as SocketIo from "socket.io"

import { IStd } from "@ArcaneDiver/common"

export class Socket {
        private static INSTANCE: Socket;
        
        private _socket: SocketIo.Server;

        private constructor() {
        }

        public static getInstance(): Socket {
                if (!this.INSTANCE)
                        this.INSTANCE = new Socket();
                
                return this.INSTANCE;
        }

        public init(serverSocket: SocketIo.Server) {
                this._socket = serverSocket;
        }

        public get socket() {
                return this._socket;
        }

        public async sendStdOutWithSocket(generator: AsyncGenerator<IStd>, repoName: string) {
                console.log("Streaming trough the socket")
                for await (const std of generator) {
                        console.log(std);
                        this._socket.emit(`${repoName}/stdout`, std);
                }
        }
}