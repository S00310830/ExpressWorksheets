import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";

const PORT = env.port
const app: Application = express();

app.use(express.json());
app.use('/api/v1/cars', carRoutes);
app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

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

const startServer = async () => {
 await connectDB();
 app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 });
};

startServer();
    