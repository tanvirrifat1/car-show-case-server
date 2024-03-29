import { Response, Request } from 'express';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const insertIntoDb = async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
};
const LoginUser = async (req: Request, res: Response) => {
  const result = await AuthService.LoginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loin successfully',
    data: {
      accessToken: result.accessToken,
    },
  });
};

export const AuthController = {
  insertIntoDb,
  LoginUser,
};
