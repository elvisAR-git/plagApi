/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.TZ = "Africa/Nairobi";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/environment");

mongoose.Promise = global.Promise;

// Connect to database
require("./utils/db");

// Setup app
var app = express();
require("./config/express")(app);

// Register schema for models
require("../app/models")();

require("./utils/formatters");

require("../app/routes")(app);

app.get("/", (req, res) => res.send(`PC_api running on port : ${config.port}`));
// Start app
app.listen(config.port, config.ip, () => {
  console.info(
    `Express app listening on ${config.port} and ip ${config.ip}, in ${app.get(
      "env"
    )} mode`
  );
});

process.on("uncaughtException", (err) => {
  console.error(`Caught exception: ${err}`);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});
