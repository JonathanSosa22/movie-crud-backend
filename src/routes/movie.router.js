const {
  getAllMovies,
  createMovie,
  getOneMovie,
  removeMovie,
  updateMovie,
  setMovieActors,
  setMovieDirectors,
  setMovieGenres,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/").get(getAllMovies).post(createMovie);

movieRouter.route("/:id").get(getOneMovie).delete(removeMovie).put(updateMovie);

movieRouter.route("/:id/actors").post(setMovieActors);
movieRouter.route("/:id/directors").post(setMovieDirectors);
movieRouter.route("/:id/genres").post(setMovieGenres);

module.exports = movieRouter;
