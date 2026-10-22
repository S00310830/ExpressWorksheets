import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
//import {authenticateKey} from './middleware/auth.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler.middleware";


export const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/ping", (_req : Request, res: Response) => {
    res.status(200).json({ message: "hello from Una" });
});

app.get("/pong", (_req : Request, _res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req : Request, _res: Response) => {
    console.log("Received request to /pung");
    throw new Error("Simulated error in /pung route");
});

app.use('/api/v1/cars', /*authenticateKey*/ carRoutes);

app.use((req: Request, _res: Response, next: Function) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler)
