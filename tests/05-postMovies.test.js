const frisby = require('frisby');
const { HOST } = require('./config/env-vars');
const restoreDatabase = require('./config/restoreDatabase');
const PORT = 3001;

describe('05 - Crie o endpoint POST /movies', () => {
  beforeEach(async () => {
    await restoreDatabase();
  });

  afterEach(async () => {
    await restoreDatabase();
  });

  test('Será validado que é possível cadastrar um filme', async () => {
    let registeredId;

    await frisby.post(`${HOST}:${PORT}/movies`, {
      body: {
        movie: 'A volta dos que não foram',
        price: 1
      }
    })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        console.log(result);
        expect(result.movie).toEqual('A volta dos que não foram');
        expect(result.price).toEqual(1);
        expect(result).toHaveProperty('id');
        registeredId = result.id;
      });

    await frisby.get(`${HOST}:${PORT}/movies/${registeredId}`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.movie).toEqual('A volta dos que não foram');
      });
  });
});