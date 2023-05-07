 // TODO really no idea how to run the real server and test it
  const request = require('supertest');
const app = require('../app');

describe('POST /users', () => {
  it('should add a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password'
      })
      .expect(201);
      
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('John Doe');
    expect(res.body.email).toEqual('johndoe@example.com');
  });
});
