import httpStatus from 'http-status';
import { Request, Response } from 'express';

import BusinessError from '@utilities/errors/business';
import ForbiddenError from '@utilities/errors/forbidden';
import UnauthorizedError from '@utilities/errors/unauthorized';

export default function errorHandler(
  err: BusinessError | ForbiddenError | UnauthorizedError | Error,
  req: Request,
  res: Response,
): void {
  if (err instanceof BusinessError && err.isBusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      options: err.options,
    });
  } else if (err instanceof UnauthorizedError && err.isUnauthorizedError) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  } else if (err instanceof ForbiddenError && err.isForbiddenError) {
    res.sendStatus(httpStatus.FORBIDDEN);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ stack: err.stack, message: err.message });
  }
}
