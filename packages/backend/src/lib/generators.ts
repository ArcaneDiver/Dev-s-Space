import { ChildProcessWithoutNullStreams } from "child_process"

import { IStd } from "@ArcaneDiver/common"
import { StdError } from './errors';

export const processToGenerator = async function* (process: ChildProcessWithoutNullStreams): AsyncGenerator<string> {
        while (true) {
                try {
                        const stdout = await new Promise<string>((res, rej) => {
                                const handleSTDOUT = (out: Buffer) => {
                                        process.removeAllListeners();
                                        res(out.toString());
                                };

                                const handleError = (err: Buffer) => {
                                        process.removeAllListeners();

                                        rej(new Error(err.toString()));
                                }
                                const handleClose = () => {
                                        process.removeAllListeners();

                                        rej();
                                };

                                process.stdout.on("message", handleSTDOUT)

                                process.stderr.on("data", handleError);
                                process.on("exit", handleClose);
                                process.on("close", handleClose);
                        });

                        yield stdout;

                } catch (e) {

                        yield e.message;

                        break;
                }
        }
}

export const handleErrorFromGenerator = async function* (generator: AsyncGenerator<string>): AsyncGenerator<IStd> {
        console.log("Parsing errors");
        try {
                for await (const std of generator) {
                        yield {
                                type: "stdout",
                                message: std
                        }
                }
        } catch (e) {
                if (e instanceof Error) {
                        console.log(e.message);
                        yield {
                                type: "stderr",
                                message: e.message
                        }

                        throw StdError
                }
        }
}