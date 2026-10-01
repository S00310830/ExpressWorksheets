import express, {Application} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";
//import {authenticateKey} from './middleware/auth.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';

const PORT = env.port
const app: Application = express();

app.use(express.json());
//app.use('/api/v1/cars', authenticateKey, carRoutes);
app.use('/api/v1/cars', carRoutes);
app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);


const startServer = async () => {
 await connectDB();
 app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 });
};

startServer();
    