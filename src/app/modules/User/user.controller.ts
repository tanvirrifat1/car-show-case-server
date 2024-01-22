import { Response, Request } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const insertIntoDb = async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
};

const GetAllData = async (req: Request, res: Response) => {
  const result = await UserService.GetAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',

    data: result,
  });
};

export const UserController = {
  insertIntoDb,
  GetAllData,
};
