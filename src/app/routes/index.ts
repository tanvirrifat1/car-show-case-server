import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CarRoutes } from '../modules/car/car.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
