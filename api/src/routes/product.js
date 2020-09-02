const server = require("express").Router();
const { Product, Categories } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//No puedo testear si funciona ya que aun no han creado la asociacion de Producto-Categorias
//Se debe tener una tabla intermedia product-categories
server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
  Product.findbyPk(req.params.idProducto).then((producto) => {
    producto.addCategories(Categories.findbyPk(req.params.idCategoria));
    const result = Product.findOne({
      where: { id: req.params.idProducto },
      include: Categories,
    });
  });
});

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
	Product.findbyPk(req.params.idProducto).then((producto) => {
	  producto.removeCategories(Categories.findbyPk(req.params.idCategoria));
	  const result = Product.findOne({
		where: { id: req.params.idProducto },
		include: Categories,
	  });
	});
  });

module.exports = server;
