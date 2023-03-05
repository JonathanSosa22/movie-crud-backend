const catchError = require("../utils/catchError");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

const getAllActors = catchError(async (req, res) => {
  const actorsAll = await Actor.findAll({ include: [Movie] });
  return res.json(actorsAll);
});

const createActor = catchError(async (req, res) => {
  const actorCreate = await Actor.create(req.body);
  return res.status(201).json(actorCreate);
});

const getOneActor = catchError(async (req, res) => {
  const { id } = req.params;
  const actorOne = await Actor.findByPk(id, { include: [Movie] });
  if (!actorOne) return res.sendStatus(404);
  return res.json(actorOne);
});

const removeActor = catchError(async (req, res) => {
  const { id } = req.params;
  await Actor.destroy({ where: { id } });
  return res.sendStatus(204);
});

const updateActor = catchError(async (req, res) => {
  const { id } = req.params;
  const actorUpdate = await Actor.update(req.body, {
    where: { id },
    returning: true,
  });
  if (actorUpdate[0] === 0) return res.sendStatus(404);
  return res.json(actorUpdate[1][0]);
});

module.exports = {
  getAllActors,
  createActor,
  getOneActor,
  removeActor,
  updateActor,
};
