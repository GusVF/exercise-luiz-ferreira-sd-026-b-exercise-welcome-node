const { HOST } = require('./config/env-vars');
const frisby = require('frisby');
const restoreDatabase = require('./config/restoreDatabase');
const PORT = 3001;

describe('07 - Crie o endpoint DELETE /movies/:id', function () {
  beforeAll(async () => {
    await restoreDatabase();
  });

  afterAll(async () => {
    await restoreDatabase();
  });

  test('Será validado que é possível remover um filme', async () => {
    await frisby.delete(`${HOST}:${PORT}/movies/3`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toEqual('Filme deletado com sucesso');
      });

    await frisby.get(`${HOST}:${PORT}/movies/3`)
      .expect('status', 404);
  });
});