import express, {Application} from "express" ;
import carRoutes from './routes/cars';
//import {authenticateKey} from './middleware/auth.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';


export const app: Application = express();

app.use(express.json());
app.get("/ping", (_req, res) => {
    res.status(200).json({ message: "hello from Una" });
});
app.use('/api/v1/cars', /*authenticateKey*/ carRoutes);
app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);