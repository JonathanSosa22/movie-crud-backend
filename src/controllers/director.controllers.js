const Director = require("../models/Director");
const Movie = require("../models/Movie");
const catchError = require("../utils/catchError");

const getAllDirectors = catchError(async (req, res) => {
  const directorAll = await Director.findAll({ include: [Movie] });
  return res.json(directorAll);
});

const createDirector = catchError(async (req, res) => {
  const directorCreate = await Director.create(req.body);
  return res.status(201).json(directorCreate);
});

const getOneDirector = catchError(async (req, res) => {
  const { id } = req.params;
  const directorOne = await Director.findByPk(id, { include: [Movie] });
  if (!directorOne) return res.sendStatus(404);
  return res.json(directorOne);
});

const removeDirector = catchError(async (req, res) => {
  const { id } = req.params;
  await Director.destroy({ where: { id } });
  return res.sendStatus(204);
});

const updateDirector = catchError(async (req, res) => {
  const { id } = req.params;
  const directorUpdate = await Director.update(req.body, {
    where: { id },
    returning: true,
  });
  if (directorUpdate[0] === 0) return res.sendStatus(404);
  return res.json(directorUpdate[1][0]);
});

module.exports = {
  getAllDirectors,
  createDirector,
  getOneDirector,
  removeDirector,
  updateDirector,
};
