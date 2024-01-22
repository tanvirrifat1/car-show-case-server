import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit?: number; // Make 'limit' optional by adding ?
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
