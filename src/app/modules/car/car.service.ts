import { Car, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IGenericResponse } from '../../interface/common';
import { paginationHelpers } from '../../interface/paginationHelpers';
import {
  IServiceFilterRequest,
  serviceSearchableFields,
} from './car.interface';
import { IPaginationOptions } from '../../interface/pagination';

const insertIntoDb = async (data: Car): Promise<Car> => {
  const result = await prisma.car.create({ data });
  return result;
};

const GetAllData = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Car[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CarWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.car.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.car.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// const GetAllData = async (
//   filters: IServiceFilterRequest,
//   options: IPaginationOptions,
// ) => {
//   const { size, page, skip } = paginationHelpers.calculatePagination(options);

//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: serviceSearchableFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const whereConditions: Prisma.CarWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.car.findMany({
//     where: whereConditions,
//     skip,
//     take: size,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.car.count({
//     where: whereConditions,
//   });
//   return {
//     meta: {
//       total,
//       page,
//       size,
//     },
//     data: result,
//   };
// };

// const GetAllData = async (
//   filters,
//   options,
// ): Promise<IGenericResponse<Car[]>> => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const result = await prisma.car.findMany({
//     skip,
//     take: limit,
//   });

//   const total = await prisma.car.count();

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

export const CarService = { insertIntoDb, GetAllData };
