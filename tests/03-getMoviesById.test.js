const frisby = require('frisby');
const { HOST } = require('./config/env-vars');
const restoreDatabase = require('./config/restoreDatabase');
const PORT = 3001;

describe('03 - Crie o endpoint GET movies/:id', () => {
  beforeEach(async () => {
    await restoreDatabase();
  });

  afterEach(async () => {
    await restoreDatabase();
  });

  test('Será validado que o endpoint retorna um filme com base no id', async () => {
    await frisby
      .get(`${HOST}:${PORT}/movies/1`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual({
          "id": 1,
          "movie": "Avatar",
          "price": 5
        });
      });
  });

  test('Será validado que o endpoint retorna uma mensagem quando o filme não existe', async () => {
    await frisby
      .get(`${HOST}:${PORT}/movies/871`)
      .expect('status', 404)
      .then((responseGet) => {
        const response = responseGet;
        const body = JSON.parse(response.body);
        expect(body.message).toEqual('Filme não encontrado');
      });
  });
});