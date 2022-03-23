import { Book } from '@prisma/client';

import BookRepository from '@repositories/book';

import BusinessError, { BookCodeError, ValidationCodeError } from '@utilities/errors/business';

export default class BookService {
  static async create(book: Book) {
    if (book.inventory < 0) {
      throw new BusinessError(ValidationCodeError.INVALID_PARAMS, {
        message: 'book_inventory_cannot_be_less_than_zero',
      });
    }

    const bookSaved = await BookRepository.selectOne({
      where: {
        sbn: book.sbn,
      },
    });

    if (bookSaved) {
      throw new BusinessError(BookCodeError.SBN_ALREADY_REGISTERED);
    }

    return BookRepository.create({
      name: book.name,
      author: book.author,
      sbn: book.sbn,
      description: book.description,
      inventory: book.inventory,
    } as Book);
  }

  static async getWithPagination({ skip, take }: { skip: number, take: number }) {
    const count = await BookRepository.count({});
    const results = await BookRepository.selectAll({
      select: {
        id: true,
        name: true,
      },
      skip,
      take,
    });

    return { count, results };
  }
}
