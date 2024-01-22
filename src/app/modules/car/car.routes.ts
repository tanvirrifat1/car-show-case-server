import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CarController } from './car.controller';

const router = express.Router();

router.post('/create', auth(ENUM_USER_ROLE.ADMIN), CarController.insertIntoDb);

export const CarRoutes = router;
