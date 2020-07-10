import { Router } from "express"

import Controllers from "../controllers"

const router = Router();

router.get("/", Controllers.servers.getServers);
router.post("/", Controllers.servers.addServer);

export default router;