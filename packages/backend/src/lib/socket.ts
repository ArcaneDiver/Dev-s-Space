import * as SocketIo from "socket.io"


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
}