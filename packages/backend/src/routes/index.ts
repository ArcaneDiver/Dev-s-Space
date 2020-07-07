import { Router } from "express"

import { clone } from "../lib/git utils"

const router = Router();

router.get("/", async (req, res) => {
        res.status(200).json({
                message: "Ok"
        })
        for await (const stdout of clone("https://github.com/ArcaneDiver/Dev-s-Space")) {
                console.log(stdout);
        }
})


export default router;