const readJsonData = require('../src/utils/fs/readJsonData');
const path = require('path');

describe('02 - Implemente a função readJsonData', () => {
  test('deve fazer a leitura de um arquivo JSON', async () => {
    const filePath = path.resolve('tests', 'mocks', 'peoples.json');
    const peoples = await readJsonData(filePath);
    const expectResult = [
      {
        "name": "John",
        "age": 30
      },
      {
        "name": "Ada",
        "age": 25
      }
    ]
    expect(peoples).toEqual(expectResult);
  });
});