const server = require("express").Router();
const { Reviews, Order } = require("../db.js");

// Busca todas las review y las devuelve en un array
server.get("/", (req, res, next) => {
    Reviews.findAll()
    .then((data) => res.status(200).send(data))
    .catch(next)
  });

module.exports = server;
