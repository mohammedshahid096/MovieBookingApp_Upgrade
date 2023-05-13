const Movie = require("../models/movie.model");

// for getting all the movies
module.exports.findAllMovies = async (req, res) => {
  try {
    const { status, title, genres, artists, start_date, end_date } = req.query;
    let query = {};
    //for status query
    if (status) {
      if (status.toUpperCase() === "PUBLISHED") {
        query.published = true;
      } else if (status.toUpperCase() === "RELEASED") {
        query.released = true;
      }
    }

    // for title
    if (title) {
      query.title = { $regex: `${title}`, $options: "i" };
    }

    // for genres
    if (genres) {
      const categories = genres.split(",");
      query.genres = { $in: categories };
    }

    // for artist
    if (artists) {
      total_artists = artists.split(" ");
      total_f = total_artists[0].split(" ");
      total_l = total_artists[1].split(" ");

      query = {
        "artists.first_name": { $in: total_f },
        "artists.last_name": { $in: total_l },
      };
    }

    // for date related
    if (start_date && end_date) {
      query.release_date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    } else if (start_date) {
      const s = new Date(start_date);
      query.release_date = {
        $gte: s,
      };
    } else if (end_date) {
      query.end_date = { $lte: new Date(end_date) };
    }
    // console.log(query);
    const movies = await Movie.find(query);

    res.status(200).json({ total: movies.length, movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for getting specific movie id
module.exports.findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.movieid);
    const movie = await Movie.findOne({ movieid: id });
    if (!movie) {
      return res.status(200).json({ message: "movie not found" });
    }

    res.status(200).json([movie]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for getting a spectific movie id shows
module.exports.findShows = async (req, res) => {
  try {
    const id = parseInt(req.params.movieid);
    const movieData = await Movie.findOne({ movieid: id });
    res.status(200).json(movieData.shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
