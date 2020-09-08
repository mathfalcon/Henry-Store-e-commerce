const server = require("express").Router();
const { Users } = require("../db.js");

// Busca todos los usuarios y los devuelve en un array
server.get("/", (req, res, next) => {
  Product.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});