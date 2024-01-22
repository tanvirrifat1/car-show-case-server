import { Response, Request } from 'express';
import { CarService } from './car.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import pick from '../../interface/pick';

const insertIntoDb = async (req: Request, res: Response) => {
  const result = await CarService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars added successfully',
    data: result,
  });
};

const GetAllData = async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'name', 'price', 'category']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  console.log(filters, 'filters');
  console.log(options, 'options');
  const result = await CarService.GetAllData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars fetched successfully',
    meta: result.meta,
    data: result.data,
  });
};

export const CarController = {
  insertIntoDb,
  GetAllData,
};
