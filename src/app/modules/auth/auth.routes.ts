import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.LoginUser);
router.post('/create-user', AuthController.insertIntoDb);

export const AuthRoutes = router;
