/**
 * Express configuration
 */
const config = require("../environment/index");

var express = require("express");
var morgan = require("morgan");
var path = require("path");
const cors = require("cors");
const multer = require("multer");
var express = require("express");

module.exports = function (app) {
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));

  app.use(express.static(path.join(__dirname, "../public")));
  app.use(cors());

  app.use(
    multer({
      dest: config.UPLOAD,
    }).any()
  );
};
