import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CarController } from './car.controller';

const router = express.Router();

router.post('/create', auth(ENUM_USER_ROLE.ADMIN), CarController.insertIntoDb);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), CarController.GetAllData);

export const CarRoutes = router;
