const Artists = require("../models/artist.model");

// finding all the artists data
module.exports.findAllArtists = async (req, res) => {
  try {
    const artists = await Artists.find();
    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
