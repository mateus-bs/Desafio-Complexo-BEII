const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

describe('Endpoint Tests', () => {
  let token;

  beforeAll(() => {
    // Generate a valid token for testing
    token = jwt.sign({ user: 'mateusbs' }, JWT_SECRET, { expiresIn: '1h' });
  });

  test('GET /usuarios should work', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(200);
  });

  test('GET /clientes should require token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(401); // Assuming 401 Unauthorized if no token is provided
  });

  test('GET /clientes with valid token should work', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
