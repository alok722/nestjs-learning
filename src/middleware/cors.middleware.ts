/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";

export const enableCors = (req: Request, res: Response, next: Function) => {
    console.log('CORS Middleware Called!');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    next();
}