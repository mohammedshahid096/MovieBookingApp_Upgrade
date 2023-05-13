const express = require("express");
const artistRoutes = express.Router();
const artistcontroller = require("../controllers/artist.controller");

artistRoutes.get("/", artistcontroller.findAllArtists);

module.exports = artistRoutes;
