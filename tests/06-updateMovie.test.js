const frisby = require('frisby');
const { HOST } = require('./config/env-vars');
const restoreDatabase = require('./config/restoreDatabase');
const PORT = 3001;

describe('06 - Crie o endpoint PUT /movies/:id', () => {
  beforeEach(async () => {
    await restoreDatabase();
  });

  afterEach(async () => {
    await restoreDatabase();
  });

  test('Será validado que é possível editar um filme', async () => {
    await frisby.put(`${HOST}:${PORT}/movies/3`, {
      body: {
        movie: 'Um filme editado',
        price: 3
      }
    })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.movie).toEqual('Um filme editado');
        expect(result.price).toEqual(3);
        expect(result.id).toEqual(3);
      });

    await frisby.get(`${HOST}:${PORT}/movies/3`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.movie).toEqual('Um filme editado');
        expect(result.price).toEqual(3);
        expect(result.id).toEqual(3);
      });
  });
});