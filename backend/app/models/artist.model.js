const mongoose = require("mongoose");

const artist_schema = mongoose.Schema({
  artistid: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  wiki_url: {
    type: String,
    required: true,
  },

  profile_url: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
  },
});

const Artists = mongoose.model("artists", artist_schema);

module.exports = Artists;
