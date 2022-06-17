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

describe('Users test suite', () => {
  it('get all users', async () => {
    const response = await request(server).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('create new user', async () => {
    const mockData = {
      username: 'test',
      age: 20,
      hobbies: ['test'],
    };
    const response = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockData));

    expect(response.statusCode).toBe(201);

    // Check all sended fields bypassing id field generated from the server
    expect(response.body.username).toEqual(mockData.username);
    expect(response.body.age).toEqual(mockData.age);
    expect(response.body.hobbies).toEqual(mockData.hobbies);
  });
});
