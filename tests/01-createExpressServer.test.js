const app = require('../src/app.js');
const frisby = require('frisby');
const { PORT, TEST_ENDPOINT, HOST } = require('./config/env-vars');

describe('01 - Deve criar um servidor express', () => {
  let server;
  beforeAll(() => {
    try {
      app.get(`/${TEST_ENDPOINT}`, (req, res) => res.status(200).send('OK'));
      server = app.listen(PORT);
    } catch (err) {
      throw new Error('Express app not defined');
    }
  });

  afterAll(() => {
    server.close();
  });

  test('deve ser possível acessar a rota de teste do servidor', async () => {
    await frisby
      .get(`${HOST}:${PORT}/${TEST_ENDPOINT}`)
      .expect('status', 200)
      .then((response) => {
        expect(response.body).toEqual('OK');
      });
  });
});