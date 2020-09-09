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


//Trae todos los productos de una categoria
server.get("/category/:name", (req, res, next) => {
  const name = req.params.name;
  Categories.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: Product,
  })
    .then((rows) => res.status(200).json(rows))
    .catch(next);
});


//Elimina una categoria segun su id
server.delete("/category/:id", (req, res, next) => {
  const id = req.params.id;

  Categories.destroy({ where: { id } })
    .then((rows) => res.status(200).json(rows))
    .catch(next);
});


//Crea una nueva categoria
server.post("/create-category", (req, res, next) => {
  
  Categories.findOrCreate({
    where: {
      name: req.body.name,
      description: req.body.description,
    },
  })
    .then((category) => {
      //Sucess handler
      res
        .status(200)
        .send(`La categoría ${category[0].dataValues.name} se creó con exito`);
    })
    .catch((err) => {
      //Error Handler
      res.status(400).send("No se pudo crear la categoría solicitada");
    });
});

module.exports = server;
