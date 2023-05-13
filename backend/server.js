const express = require("express");
const app = express();
const databaseCon = require("./app/config/db.config");
const cors = require("cors");
const bodyParser = require("body-parser");
const index_routes = require("./app/routes/index");

// cors is implemented to * as every one can access
app.use(cors({ origin: "*" }));

// bodyParser is used so that frontend data can be accssed in the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// here the DataBase method will be called
databaseCon();

app.use("/api/", index_routes);

const PORT = 8085;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
