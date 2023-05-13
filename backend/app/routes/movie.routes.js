const express = require("express");
const movieRoutes = express.Router();
const moviecontroller = require("../controllers/movie.controllers");

movieRoutes.get("/", moviecontroller.findAllMovies);
movieRoutes.get("/:movieid", moviecontroller.findOne);
movieRoutes.get("/:movieid/shows", moviecontroller.findShows);

module.exports = movieRoutes;
