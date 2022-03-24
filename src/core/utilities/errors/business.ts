import { CustomError } from 'ts-custom-error';

export default class BusinessError extends CustomError {
  code: string;

  options: { [key: string]: string | number | boolean };

  isBusinessError = true;

  constructor(code: string, options?: { [key: string]: string | number | boolean }) {
    super(code);
    this.code = code;
    this.options = options || {};
  }
}

export const ValidationCodeError = {
  INVALID_PARAMS: 'invalid_params',
};

export const BookCodeError = {
  BOOK_NOT_FOUND: 'book_not_found',
  SBN_ALREADY_REGISTERED: 'sbn_already_registered',
};
