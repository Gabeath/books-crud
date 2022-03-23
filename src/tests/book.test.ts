import { faker } from '@faker-js/faker';
import { PrismaClient, Book } from '@prisma/client';
import request from 'supertest';

import server from '@app/server';

const prisma = new PrismaClient();
faker.locale = 'pt_BR';

describe('Book creation tests', () => {
  it('should create a new book', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: faker.datatype.number(100),
      sbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
    } as Book;

    const response = await request(server)
      .post('/api/book')
      .send(bookToCreate);

    expect(response.status).toBe(200);

    await prisma.book.delete({
      where: { sbn: bookToCreate.sbn },
    });
  });

  it('should return a book object when create a new book', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: faker.datatype.number(100),
      sbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
    } as Book;

    const response = await request(server)
      .post('/api/book')
      .send(bookToCreate);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('inventory');
    expect(response.body).toHaveProperty('sbn');

    await prisma.book.delete({
      where: { sbn: bookToCreate.sbn },
    });
  });

  it('should not create a new book with missing parameters', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: faker.datatype.number(100),
    } as Book;

    const response = await request(server)
      .post('/api/book')
      .send(bookToCreate);

    expect(response.status).toBe(400);
  });
});