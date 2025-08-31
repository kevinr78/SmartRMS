import {Router} from 'express';
import { login,register } from '../controllers/AuthControllers.js';
import { refreshAccessToken } from '../services/AuthService.js';
const authRouter = Router();

authRouter.post('/register',register);
authRouter.post('/login', login);
authRouter.post('/logout', () =>{ console.log("Logged Out")});
authRouter.post('/refresh-token',refreshAccessToken);

export default authRouter;
