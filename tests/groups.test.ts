import request from 'supertest';
import app from '../src/index';

describe('Groups API', () => {
  let groupId: number;
  let userId: number;

  beforeAll(async () => {
    const userRes = await request(app).post('/users').send({
      name: 'TestUser',
      surname: 'ForGroup',
      birth_date: '1995-08-15',
      sex: 'male'
    });
    userId = userRes.body.id;
  });

  it('should create a new group', async () => {
    const res = await request(app).post('/groups').send({
      name: 'Test Group',
      description: 'Group for testing'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    groupId = res.body.id;
  });

  it('should get group by ID', async () => {
    const res = await request(app).get(`/groups/${groupId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Group');
  });

  it('should update group', async () => {
    const res = await request(app).put(`/groups/${groupId}`).send({
      name: 'Updated Group',
      description: 'Updated description'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Group');
  });

  it('should allow a user to join a group', async () => {
    const res = await request(app).post(`/groups/${userId}/groups/${groupId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should allow a user to leave a group', async () => {
    const res = await request(app).delete(`/groups/${userId}/groups/${groupId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should delete the group', async () => {
    const res = await request(app).delete(`/groups/${groupId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
