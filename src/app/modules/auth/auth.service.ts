import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { ISignInData } from './auth.interface';
import ApiError from '../../errors/AppError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../utils/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const insertIntoDb = async (data: User): Promise<User> => {
  const hasPass = await bcrypt.hash(data?.password as string, 12);
  data.password = hasPass;
  const result = await prisma.user.create({ data });
  return result;
};

const LoginUser = async (payload: ISignInData) => {
  const { email, password } = payload;

  const isExist = await prisma.user.findUnique({
    where: { email },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found');
  }

  if (isExist.password && password) {
    if (!(await bcrypt.compare(password, isExist.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is missing');
  }

  const { id: userId, role } = isExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken,
  };
};

export const AuthService = {
  insertIntoDb,
  LoginUser,
};
