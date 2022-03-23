import { Request } from 'express';

// eslint-disable-next-line import/prefer-default-export
export function controllerPaginationHelper(req: Request) {
  return {
    skip: Number(req.query.skip) || 0,
    take: Number(req.query.take) || 10,
  };
}
