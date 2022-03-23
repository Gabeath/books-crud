import { Schema } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
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
    errorMessage: 'invalid_inventory',
  },
};
