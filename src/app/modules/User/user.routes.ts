import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

router.post('/', UserController.insertIntoDb);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.GetAllData);

export const UserRoutes = router;
