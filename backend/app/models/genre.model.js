const mongoose = require("mongoose");

const genres_schema = mongoose.Schema({
  genreid: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Genres = mongoose.model("genres", genres_schema);

module.exports = Genres;
