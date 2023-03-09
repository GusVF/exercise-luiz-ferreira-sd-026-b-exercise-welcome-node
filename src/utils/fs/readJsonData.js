const fs = require('fs').promises;

const readJsonData = async (path) => {
    const fileContent = await fs.readFile(path, 'utf-8');
    const movies = JSON.parse(fileContent);
    // console.log(movies);
    return movies;
};

function main() {
  readJsonData('./src/movies.json');
}

main();

module.exports = readJsonData;