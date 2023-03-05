const {
  getAllDirectors,
  createDirector,
  getOneDirector,
  removeDirector,
  updateDirector,
} = require("../controllers/director.controllers");
const express = require("express");

const directorRouter = express.Router();

directorRouter.route("/").get(getAllDirectors).post(createDirector);

directorRouter
  .route("/:id")
  .get(getOneDirector)
  .delete(removeDirector)
  .put(updateDirector);

module.exports = directorRouter;
