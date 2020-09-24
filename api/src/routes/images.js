const server = require("express").Router();
const { Image, Product} = require("../db.js");

//Ruta para obtener todas las imagenes del producto que viene como parametro
server.get("/:idProduct", (req, res, next) => {
  const idProduct = req.params.idProduct;
  Image.findAll({
    where: {
      productId: idProduct,
    }
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

module.exports = server;