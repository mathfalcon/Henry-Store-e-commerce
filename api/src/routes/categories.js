const server = require("express").Router();
const { Categories } = require("../db.js");

server.get("/", (req, res, next) => {
  // Busca todos los productos y los devuelve en un array
  Categories.findAll()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch(next);
});

module.exports = server;
