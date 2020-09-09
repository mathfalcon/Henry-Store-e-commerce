const server = require("express").Router();
const { Users } = require("../db.js");

// Busca todos los usuarios y los devuelve en un array
server.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

// Ruta para crear un usuario
server.post("/create", (req, res, next) => {
  Users.findOrCreate({
    where: {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    },
  })
    .then((user) => {
      //Sucess handler
      res
        .status(200)
        .send(user[0]);
    })
    .catch((err) => {
      //Error Handler
      console.log(err);
      res.status(400).send("No se pudo crear el usuario solicitado");
    });
});

module.exports = server;