const fs = require('fs/promises');
const path = require('path');
const frisby = require('frisby');
const restoreDatabase = require('./config/restoreDatabase');
const { HOST } = require('./config/env-vars');
const PORT = 3001;

describe('04 - Crie o endpoint GET /movies', () => {
  beforeEach(async () => {
    await restoreDatabase();
  });

  afterEach(async () => {
    await restoreDatabase();
  });

  test('Será validado que o endpoint retorna todos os filmes cadastrados', async () => {
    const filePath = path.resolve('tests', 'mocks', 'movies.json');
    const movies = await fs.readFile(filePath, 'utf8');
    await frisby
      .get(`${HOST}:${PORT}/movies`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual(JSON.parse(movies));
      });
  });
});