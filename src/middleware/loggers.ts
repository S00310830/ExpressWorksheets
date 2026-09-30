import express, { Application, Request, Response } from "express";

const app : Application = express();

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "Hello from Isaac's server, this is my ping test!",
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({
    message: "this is bananas",
    });
});

app.get('/goober', async (_req : Request, res: Response) => {
    res.json({
    message: "this is the goober page, welcome goober",
    });
});