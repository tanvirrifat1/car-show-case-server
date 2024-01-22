import { Response, Request } from 'express';
import { CarService } from './car.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const insertIntoDb = async (req: Request, res: Response) => {
  const result = await CarService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars added successfully',
    data: result,
  });
};

export const CarController = {
  insertIntoDb,
};
