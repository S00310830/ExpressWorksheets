import { Router } from 'express';
import { AuthController} from '../controllers/auth';
import { CarController } from '../controllers/cars';
import { validate } from '../middleware/validate.middleware';
import { loginZSchema, registerZSchema } from '../models/users';
import { authenticateJWT } from '../middleware/auth.middleware';
import { carParamsSchema } from '../models/cars';
 

const router = Router();
const authController = new AuthController();
const carController = new CarController();

router.get('/me', authenticateJWT, authController.me);
router.post('/register', validate(registerZSchema), authController.register);
router.post('/login', validate(loginZSchema), authController.login);
router.delete('/:id', authenticateJWT, validate(carParamsSchema), carController.deleteCar);
export default router;
