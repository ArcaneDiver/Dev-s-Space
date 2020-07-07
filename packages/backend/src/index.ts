/*import "./lib/env"

import app from "./app"

const port = process.env.PORT || 8000;


app.listen(port, () => {
        console.log(`Server running at ${port} port`);
})*/
import "@ArcaneDiver/common"
import { EventEmitter } from "events"
import e = require("express");

(async () => {
        const ee = new EventEmitter();

        const generator = async function* () {
                console.log("generating")
                while (true) {
                        console.log("LOOP");
                        try {
                                console.log("AWAITING")
                                await new Promise((res, rej) => {
                                        ee.on("ezz", () => {
                                                console.log("ezz recived")
                                                res();
                                        })
                                        
                                        ee.on("err", () => {
                                                console.log("err recived")
                                                rej();
                                        })
                                });
                                console.log("Promise completed");
                                yield;
                        } catch (e) {
                                console.log("rejected")
                                break;
                        }
                        console.log("LOOP END");
                }
                console.log("LOOP OUT")
        }
        console.log("debug 1");
        for await (const a of generator()) {
                console.log(a, "tick");
        }
        console.log("debug 2");

})().catch((e) => console.log(e)).then(() => console.log("done"))