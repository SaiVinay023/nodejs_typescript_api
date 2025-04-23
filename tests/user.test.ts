import request from 'supertest';
import app from '../src/index';

describe('Users API', () => {
  let userId: number;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
  });

  it('should get user by ID', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.name).toBe('Test User');
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Updated User',
        email: 'updateduser@example.com',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated User');
  });

  it('should delete user', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
