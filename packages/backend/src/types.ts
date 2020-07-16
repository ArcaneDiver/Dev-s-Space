import { Request, Response, NextFunction } from "express";

export interface Controllers {
        [key: string]: Controller
}

export type Controller = (req: Request, res: Response, next: NextFunction) => void;


export type ServerConfigs = {
        name: string;
        entryPath: string;
        envs: {
                [key: string]: string
        }
};