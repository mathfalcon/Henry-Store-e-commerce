const server = require("express").Router();
const { Categories } = require("../db.js");

server.get("/", (req, res, next) => {
  // Busca todos las categorias y los devuelve en un array
  Categories.findAll()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch(next);
});

//Trae los detalles de una categoria segun su id
server.get("/:idCategoria", (req, res, next) => {
  Categories.findByPk(req.params.idCategoria)
    .then((categoria) => res.send(categoria))
    .catch(next);
});

server.put("/:idCategory/update", (req, res, next) => {
  const { name, description} = req.body;

    Categories.findByPk(req.params.idCategory)
    .then((data) => {
      if (name) data.name = name;
      if (description) data.description = description;
      data.save();
      res
        .status(200)
        .send(
          `La categoria ${data.dataValues.name} con id ${data.dataValues.id} se actualizó con éxito`
        );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = server;
