import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';
import { resolve } from 'path';
import request from 'supertest';
import { server } from '../src/server.js';

const envPath = resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

const HOSTNAME = 'localhost';
const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${process.env.PORT}`;

const userMockData = {
  username: 'test',
  age: 20,
  hobbies: ['test'],
};

describe('Users test suite', () => {
  it('get all users', async () => {
    const response = await request(server).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('create new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(userMockData));

    expect(response.statusCode).toBe(201);

    // Check all sended fields bypassing id field generated from the server
    expect(response.body.username).toEqual(userMockData.username);
    expect(response.body.age).toEqual(userMockData.age);
    expect(response.body.hobbies).toEqual(userMockData.hobbies);
  });

  it('try to get created record by id', async () => {
    // At first create user to get userId
    const responseFromCreated = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(userMockData));

    // Get user by id
    const response = await request(server).get(
      `/api/users/${responseFromCreated.body.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(responseFromCreated.body);
  });

  it('try to update created record by id', async () => {
    // At first create user to get userId
    const responseFromCreated = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(userMockData));

    // Get user by id
    const response = await request(server)
      .put(`/api/users/${responseFromCreated.body.id}`)
      .set('Accept', 'application/json')
      .send(
        JSON.stringify({
          username: 'max',
          age: 25,
          hobbies: ['lol'],
        })
      );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(responseFromCreated.body.id);
  });

  it('try to delete created record by id', async () => {
    // At first create user to get userId
    const responseFromCreated = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(userMockData));

    // Get user by id
    const response = await request(server).delete(
      `/api/users/${responseFromCreated.body.id}`
    );

    expect(response.statusCode).toBe(204);
  });
});
