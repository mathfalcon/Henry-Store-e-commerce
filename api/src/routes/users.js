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