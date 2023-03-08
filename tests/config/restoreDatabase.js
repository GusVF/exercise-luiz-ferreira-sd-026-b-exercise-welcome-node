const fs = require('fs/promises');
const path = require('path');

const dbFilePath = path.resolve('src', 'movies.json');
const mockFilePath = path.resolve('tests', 'mocks', 'movies.json');

const restoreDatabase = async () => {
  const mockDb = await fs.readFile(mockFilePath, 'utf8');
  const parsedMockDb = JSON.parse(mockDb);
  await fs.writeFile(dbFilePath, JSON.stringify(parsedMockDb, null, 2));
};

module.exports = restoreDatabase;