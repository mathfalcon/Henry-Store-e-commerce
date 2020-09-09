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

//Modifica un usuario pasado por id (query)
server.put("/:id", (req, res, next) => {

  const { name, username, email } = req.body;

  Users.findByPk(req.params.id)
    .then((data) => {
      if (name) data.name = name;
      if (username) data.username = username;
      if (email) data.email = email;
      data.save();
      res
        .status(200)
        .send(
          `El usuario ${data.dataValues.name} con id ${data.dataValues.id} se actualizó con éxito`
        );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});