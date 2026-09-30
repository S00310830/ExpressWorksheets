import express, {Application} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";
import {authenticateKey} from './middleware/auth.middleware';

const PORT = env.port
const app: Application = express();

app.use(express.json());
app.use('/api/v1/cars', authenticateKey, carRoutes);
app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

const startServer = async () => {
 await connectDB();
 app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 });
};

startServer();
    