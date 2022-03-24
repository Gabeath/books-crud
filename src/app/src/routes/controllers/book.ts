import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import BookService from '@app/services/book';
import { createBook, getBookDetails, getBooksPaginated } from '@app/routes/schemas/book';

import errorHandler from '@middlewares/error-handler';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';
import { controllerPaginationHelper } from '@utilities/utils';

const routes = express.Router();

routes.post(
  '/',
  checkSchema(createBook),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      response = await BookService.create(req.body);
    } catch (err) {
      const errCatch = err?.errors?.length
        ? new BusinessError(ValidationCodeError.INVALID_PARAMS, {
          message: err.errors.shift().msg,
        }) : err;

      return errorHandler(errCatch, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

routes.get(
  '/:id',
  checkSchema(getBookDetails),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      response = await BookService.getDetailsById(req.params.id);
    } catch (err) {
      const errCatch = err?.errors?.length
        ? new BusinessError(ValidationCodeError.INVALID_PARAMS, {
          message: err.errors.shift().msg,
        }) : err;

      return errorHandler(errCatch, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

routes.get(
  '/',
  checkSchema(getBooksPaginated),
  async (req: Request, res: Response) => {
    let response;
    try {
      validationResult(req).throw();
      response = await BookService.getWithPagination({ ...controllerPaginationHelper(req) });
    } catch (err) {
      const errCatch = err?.errors?.length
        ? new BusinessError(ValidationCodeError.INVALID_PARAMS, {
          message: err.errors.shift().msg,
        }) : err;

      return errorHandler(errCatch, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

export default routes;
