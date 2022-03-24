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
    if (skip < 0) {
      throw new BusinessError(ValidationCodeError.INVALID_PARAMS, {
        message: 'skip_cannot_be_less_than_zero',
      });
    }

    const count = await BookRepository.count({
      where: {
        inventory: {
          gt: 0,
        },
      },
    });

    const results = await BookRepository.selectAll({
      where: {
        inventory: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
      },
      skip,
      take,
    });

    return { count, results };
  }

  static async getDetailsById(id: string) {
    const book = await BookRepository.selectOne({
      where: { id },
    });

    if (!book) {
      throw new BusinessError(BookCodeError.BOOK_NOT_FOUND);
    }

    return book;
  }

  static async updateById(id: string, book: Book) {
    const bookToUpdate = await BookRepository.selectOne({
      where: { id },
    });

    if (!bookToUpdate) {
      throw new BusinessError(BookCodeError.BOOK_NOT_FOUND);
    }

    if (book.inventory < 0) {
      throw new BusinessError(ValidationCodeError.INVALID_PARAMS, {
        message: 'book_inventory_cannot_be_less_than_zero',
      });
    }

    return BookRepository.updateById(bookToUpdate.id, {
      name: book.name,
      author: book.author,
      description: book.description,
      inventory: book.inventory,
    } as Book);
  }

  static async deleteById(id: string) {
    const book = await BookRepository.selectOne({
      where: { id },
    });

    if (!book) {
      throw new BusinessError(BookCodeError.BOOK_NOT_FOUND);
    }

    await BookRepository.deleteById(book.id);
  }
}
