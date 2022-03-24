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

  it('should not create a new book when inventory is less than zero', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: -1,
      sbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
    } as Book;

    const response = await request(server)
      .post('/api/book')
      .send(bookToCreate);

    expect(response.status).toBe(400);
  });
});

describe('Books list paginated', () => {
  it('should return a books list paginated', async () => {
    const response = await request(server)
      .get('/api/book?skip=0&take=10');

    expect(response.status).toBe(200);
  });

  it('should return count and results fields', async () => {
    const response = await request(server)
      .get('/api/book?skip=0&take=10');

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('results');
  });

  it('should not return a books list paginated if send invalid params', async () => {
    const response = await request(server)
      .get('/api/book?skip=a&take=b');

    expect(response.status).toBe(400);
  });

  it('should not return a books list paginated if skip params be less than zero', async () => {
    const response = await request(server)
      .get('/api/book?skip=-1');

    expect(response.status).toBe(400);
  });
});

describe('Book details', () => {
  it('should return the book details', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: faker.datatype.number(100),
      sbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
    } as Book;

    const bookCreated = await prisma.book.create({
      data: bookToCreate,
    });

    const response = await request(server)
      .get(`/api/book/${bookCreated.id}`);

    expect(response.status).toBe(200);

    await prisma.book.delete({
      where: { id: bookCreated.id },
    });
  });

  it('should return the book details with a book object', async () => {
    const bookToCreate = {
      name: faker.lorem.words(3),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      inventory: faker.datatype.number(100),
      sbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
    } as Book;

    const bookCreated = await prisma.book.create({
      data: bookToCreate,
    });

    const response = await request(server)
      .get(`/api/book/${bookCreated.id}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('author');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('inventory');
    expect(response.body).toHaveProperty('sbn');

    await prisma.book.delete({
      where: { id: bookCreated.id },
    });
  });

  it('should not return the book details with invalid id', async () => {
    const response = await request(server)
      .get('/api/book/123');

    expect(response.status).toBe(400);
  });
});
