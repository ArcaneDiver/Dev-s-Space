
import { SERVERS_PATH } from "./env"


export class Servers {
        
        private static INSTANCE: Servers;
        
        public static readonly PATH: string = SERVERS_PATH

        private constructor() {
                
        }

        public static getInstance(): Servers {
                if (!this.INSTANCE) 
                        this.INSTANCE = new Servers();
                
                return this.INSTANCE;
        }

        public init() {
                console.log("Initializing");
        }
}