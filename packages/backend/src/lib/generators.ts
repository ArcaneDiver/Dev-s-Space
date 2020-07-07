import { ChildProcessWithoutNullStreams } from "child_process"

export const processToGenerator = async function* (process: ChildProcessWithoutNullStreams) {
        while (true) {
                try {
                        const stdout = await new Promise((res, rej) => {
                                const handleSTDOUT = (out: Buffer) => {
                                        process.removeAllListeners();
                                        res(out.toString());
                                };
                                const handleClose = (err: Buffer) => {
                                        process.removeAllListeners();
                                        rej(err.toString());
                                };

                                process.stdout.on("message", handleSTDOUT)

                                process.stderr.on("data", handleClose);
                                process.on("exit", handleClose);
                                process.on("close", handleClose);
                        });

                        yield stdout;
                
                } catch (e) {

                        yield e;
                        
                        break;
                }
        }
}