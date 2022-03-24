import { Schema } from 'express-validator';

export const createBook: Schema = {
  sbn: {
    in: 'body',
    isString: true,
    isNumeric: true,
    isLength: {
      options: {
        max: 13,
        min: 13,
      },
    },
    errorMessage: 'invalid_sbn',
  },
  name: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_name',
  },
  description: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_description',
  },
  author: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_author',
  },
  inventory: {
    in: 'body',
    isInt: true,
    toInt: true,
    errorMessage: 'invalid_inventory',
  },
};

export const getBooksPaginated: Schema = {
  skip: {
    in: 'query',
    isInt: true,
    optional: true,
    errorMessage: 'invalid_skip',
  },
  take: {
    in: 'query',
    isInt: true,
    optional: true,
    errorMessage: 'invalid_take',
  },
};

export const getBookDetails: Schema = {
  id: {
    in: 'params',
    isUUID: true,
    errorMessage: 'invalid_id',
  },
};
