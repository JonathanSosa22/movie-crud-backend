const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");
const catchError = require("../utils/catchError");

const getAllMovies = catchError(async (req, res) => {
  const moviesAll = await Movie.findAll({ include: [Actor, Director, Genre] });
  return res.json(moviesAll);
});

const createMovie = catchError(async (req, res) => {
  const moviesCreate = await Movie.create(req.body);
  return res.status(201).json(moviesCreate);
});

const getOneMovie = catchError(async (req, res) => {
  const { id } = req.params;
  const moviesOne = await Movie.findByPk(id, {
    include: [Actor, Director, Genre],
  });
  if (!moviesOne) return res.sendStatus(404);
  return res.json(moviesOne);
});

const removeMovie = catchError(async (req, res) => {
  const { id } = req.params;
  await Movie.destroy({ where: { id } });
  return res.sendStatus(204);
});

const updateMovie = catchError(async (req, res) => {
  const { id } = req.params;
  const moviesUpdate = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (moviesUpdate[0] === 0) return res.sendStatus(404);
  return res.json(moviesUpdate[1][0]);
});

const setMovieActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  await movie.setActors(req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

const setMovieDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  await movie.setDirectors(req.body);
  const directors = await movie.getDirectors();
  return res.json(directors);
});

const setMovieGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  await movie.setGenres(req.body);
  const genres = await movie.getGenres();
  return res.json(genres);
});

module.exports = {
  getAllMovies,
  createMovie,
  getOneMovie,
  removeMovie,
  updateMovie,
  setMovieActors,
  setMovieDirectors,
  setMovieGenres,
};
