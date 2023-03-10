const express = require('express');
const fs = require('fs').promises;
const readJsonData = require('./utils/fs/readJsonData');

const app = express();
app.use(express.json());

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const fileContent = await readJsonData('./src/movies.json');
  const moviesList = fileContent.find((movie) => movie.id === Number(id));
  if (!moviesList) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  return res.status(200).json(moviesList);
});

app.get('/movies', async (req, res) => {
  const fileContent = await readJsonData('./src/movies.json');
  return res.status(200).json(fileContent);
});

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const movies = await readJsonData('./src/movies.json');
    const newMovie = { id: movies.length + 1, movie, price };
    const allMovies = JSON.stringify([...movies, newMovie]);
    await fs.writeFile('./src/movies.json', allMovies);
    return res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
