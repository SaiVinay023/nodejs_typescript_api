import request from 'supertest';
import { App } from 'supertest/types';
import app from '../src/index'; // Adjust the path to your app instance
describe('User API Endpoints', () => {
  let createdUserId: number;

  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Test',
      surname: 'User',
      birth_date: '1990-01-01',
      sex: 'male'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
  });

  it('should fetch the created user by ID', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test');
  });

  it('should return 404 for unknown user', async () => {
    const res = await request(app).get(`/users/999999`);
    expect(res.statusCode).toBe(404);
  });

  it('should update the user', async () => {
    const res = await request(app).put(`/users/${createdUserId}`).send({
      name: 'Updated',
      surname: 'User',
      birth_date: '1990-01-01',
      sex: 'male'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User updated successfully');
  });

  it('should delete the user', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(204);
  });
});
