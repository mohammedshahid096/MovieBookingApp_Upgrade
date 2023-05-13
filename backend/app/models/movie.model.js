const mongoose = require("mongoose");

// movie schema is created
const movie_schema = mongoose.Schema({
  movieid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
  },
  released: {
    type: Boolean,
  },
  poster_url: {
    type: String,
  },
  release_date: {
    type: String,
  },
  publish_date: {
    type: String,
  },
  artists: [
    {
      artistid: {
        type: String,
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      wiki_url: {
        type: String,
      },
      profile_url: {
        type: String,
      },
      movies: [],
    },
  ],
  genres: [],
  duration: {
    type: Number,
  },
  critic_rating: {
    type: Number,
  },
  trailer_url: {
    type: String,
  },
  wiki_url: {
    type: String,
  },
  story_line: {
    type: String,
  },
  shows: [],
});

// here schema model is created
const Movie = mongoose.model("movies", movie_schema);

module.exports = Movie;
