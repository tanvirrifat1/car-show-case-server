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

const getSingleData = async (req: Request, res: Response) => {
  const result = await CarService.getSingleData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars single data get successfully',
    data: result,
  });
};

const GetAllData = async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'name', 'price', 'category']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CarService.GetAllData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars fetched successfully',
    meta: result.meta,
    data: result.data,
  });
};

const updateData = async (req: Request, res: Response) => {
  const result = await CarService.updateData(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars updated successfully',
    data: result,
  });
};

const DeleteData = async (req: Request, res: Response) => {
  const result = await CarService.DeleteData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars deleted successfully',
    data: result,
  });
};

export const CarController = {
  insertIntoDb,
  GetAllData,
  getSingleData,
  updateData,
  DeleteData,
};
