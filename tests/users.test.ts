import request from 'supertest';
import app from '../src/index'; // or from app.ts if you separate server logic

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Test',
      surname: 'User',
      birth_date: '1990-01-01',
      sex: 'male',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should list users', async () => {
    const res = await request(app).get('/users?limit=10&offset=0');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
