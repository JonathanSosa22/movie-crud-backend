const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

const getAllGenres = catchError(async (req, res) => {
  const genresAll = await Genre.findAll({ include: [Movie] });
  return res.json(genresAll);
});

const createGenre = catchError(async (req, res) => {
  const genreCreate = await Genre.create(req.body);
  return res.status(201).json(genreCreate);
});

const getOneGenre = catchError(async (req, res) => {
  const { id } = req.params;
  const genreOne = await Genre.findByPk(id, { include: [Movie] });
  if (!genreOne) return res.sendStatus(404);
  return res.json(genreOne);
});

const removeGenre = catchError(async (req, res) => {
  const { id } = req.params;
  await Genre.destroy({ where: { id } });
  return res.sendStatus(204);
});

const updateGenre = catchError(async (req, res) => {
  const { id } = req.params;
  const genreUpdate = await Genre.update(req.body, {
    where: { id },
    returning: true,
  });
  if (genreUpdate[0] === 0) return res.sendStatus(404);
  return res.json(genreUpdate[1][0]);
});

module.exports = {
  getAllGenres,
  createGenre,
  getOneGenre,
  removeGenre,
  updateGenre,
};
