const mongoose = require("mongoose");

// connection to Database method
const databaseCon = () => {
  const url = "mongodb://localhost:27017/moviesdb";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};

module.exports = databaseCon;
