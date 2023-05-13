const express = require("express");
const genreRoutes = express.Router();
const genreControllers = require("../controllers/genre.controller");

genreRoutes.use("/", genreControllers.findAllGenres);

module.exports = genreRoutes;
