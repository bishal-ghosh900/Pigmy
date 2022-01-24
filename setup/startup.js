const express = require("express");

const helmet = require("helmet");
const compression = require("compression");
const shortUrl = require("../routes/shortUrls");

module.exports = function (app) {
  require("./db")();

  app.use(express.static("public"));
  app.use(express.json());
  app.use(helmet());
  app.use(compression());
  app.use("/", shortUrl);
};
