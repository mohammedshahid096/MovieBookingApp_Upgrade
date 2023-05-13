const express = require("express");
const index_routes = express.Router();
const movieRoutes = require("./movie.routes");
const artistRoutes = require("./artist.routes");
const genreRoutes = require("./genre.routes");
const userRoutes = require("../routes/user.routes");

index_routes.use("/movies", movieRoutes);
index_routes.use("/artists", artistRoutes);
index_routes.use("/genres", genreRoutes);
index_routes.use("/auth/", userRoutes);

index_routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

module.exports = index_routes;
