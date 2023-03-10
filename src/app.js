const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const readJsonData = require('./utils/fs/readJsonData');

const moviePath = path.resolve(__dirname, './movies.json');
const app = express();
app.use(express.json());

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const fileContent = await readJsonData(moviePath);
  const moviesList = fileContent.find((movie) => movie.id === Number(id));
  if (!moviesList) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  return res.status(200).json(moviesList);
});

app.get('/movies', async (req, res) => {
  const fileContent = await readJsonData(moviePath);
  return res.status(200).json(fileContent);
});

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const movies = await readJsonData(moviePath);
    const newMovie = { id: movies.length + 1, movie, price };
    const allMovies = JSON.stringify([...movies, newMovie], null, 2);
    await fs.writeFile('./src/movies.json', allMovies);
    return res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { movie, price } = req.body;

  const movies = await readJsonData(moviePath);
  const indexUpDateMovie = movies.findIndex((film) => film.id === Number(id));
  if (indexUpDateMovie === -1) {
    res.status(404).json({ message: 'Team not found' });
  }
  // console.log('sou console.log');
  movies[indexUpDateMovie].movie = movie;
  movies[indexUpDateMovie].price = price;
  await fs.writeFile('./src/movies.json', JSON.stringify(movies), null, 2);
  res.status(200).json(movies[indexUpDateMovie]);
});

module.exports = app;
