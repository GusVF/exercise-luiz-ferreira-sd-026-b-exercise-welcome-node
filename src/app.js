const express = require('express');
const readJsonData = require('./utils/fs/readJsonData');

const app = express();
app.use(express.json());

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
const fileContent = await readJsonData('./src/movies.json');
const moviesList = fileContent.find((movie) => movie.id === Number(id));
   if (!moviesList) {
    return res.status(404).json({ message: 'Filme não encontrado' });
   }
    return res.status(200).json(moviesList);
});

module.exports = app;
