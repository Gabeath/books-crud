import { Book, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class BookRepository {
  static async create(book: Book) {
    return prisma.book.create({
      data: {
        sbn: book.sbn,
        name: book.name,
        description: book.description,
        author: book.author,
        inventory: book.inventory,
      },
    });
  }

  static async selectOne(args: Prisma.BookFindFirstArgs) {
    return prisma.book.findFirst(args);
  }

  static async selectAll(args: Prisma.BookFindManyArgs) {
    return prisma.book.findMany(args);
  }

  static async updateById(id: string, book: Book) {
    return prisma.book.update({
      where: { id },
      data: book,
    });
  }

  static async deleteById(id: string) {
    return prisma.book.delete({
      where: { id },
    });
  }

  static async count(args: Prisma.BookCountArgs) {
    return prisma.book.count(args);
  }
}
