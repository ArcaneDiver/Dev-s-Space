import { Request, Response } from "express";
import { Servers } from "../lib/servers";


export const getServers = (req: Request, res: Response) => {

        res.status(200).json(Servers.getInstance().servers);
}

export const addServer = (req: Request, res: Response) => {
        const { name: repoName, gitUrl } = req.body;

        if (!repoName)
                return res.status(400).json({
                        error: "Name not found"
                })
        
        if (!gitUrl)
                return res.status(400).json({
                        error: "gitUrl not found"
                });
        
        
        Servers.getInstance().addNewServer(gitUrl, repoName);


        res.status(200).json({
                message: "Job started"
        });
}