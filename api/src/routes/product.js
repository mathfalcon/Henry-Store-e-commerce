const server = require("express").Router();
const { Product, Categories } = require("../db.js");
const { Op } = require("sequelize");

// Busca todos los productos y los devuelve en un array
server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch(next);
});

// Ruta para asigna una categoria a un producto
server.post("/:idProducto/addCategory/:idCategoria", (req, res, next) => {
  const { idProducto, idCategoria } = req.params;
  var product = Product.findByPk(idProducto);
  var category = Categories.findByPk(idCategoria);

  Promise.all([product, category])
    .then((data) => {
      data[0].addCategories(data[1]);
      res
        .status(200)
        .send(
          `Se agrego la categoria ${data[1].dataValues.name} al producto ${data[0].dataValues.name}`
        );
    })
    .catch(next);
});

//Borra un producto
server.delete("/:idProducto/delete", (req, res, next) => {
	let id = req.params.idProducto;
	Product.destroy({
		where: {
			id
		}
	}).then((deleted) => {
		res.status(200).send(`Se borraron un total de ${deleted} producto/s`)
	}).catch((err) => {
		res.status(400).send('El id de Producto provisto no existe en la base de datos');
	})
});

//Trae los detalles de un producto segun su Id
server.get("/:idProducto", (req, res, next) => {
  Product.findByPk(req.params.idProducto)
    .then((producto) => res.send(producto))
    .catch(next);
});

//Ruta para remover una categoria de un producto
server.delete("/:idProducto/deleteCategory/:idCategoria", (req, res, next) => {
  const { idProducto, idCategoria } = req.params;
  var product = Product.findByPk(idProducto);
  var category = Categories.findByPk(idCategoria);

  Promise.all([product, category])
    .then((data) => {
      data[0].removeCategories(data[1]);
      res
        .status(200)
        .send(
          `Se elimino la categoria ${data[1].dataValues.name} del producto ${data[0].dataValues.name}`
        );
    })
    .catch(next);
});

// const result = Product.findOne({
//     where: { id: req.params.idProducto },
//     include: Categories,
//     });
// });

//Trae todas las categorias
server.get("/cat", (req, res, next) => {
  Categories.findAll()
    .then((cat) => {
      res.status(200).send(cat);
    })
    .catch(next);
});

//Trae todos los productos de una categoria
server.get("/category/:nombreCat", (req, res, next) => {
  const name = req.params.nombreCat;
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

server.post("/create-category", (req, res, next) => {
  //Suponiendo que el nombre de la categoria llega como body "name"
  // y la descripcion como 'description'
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

// Ruta para crear un producto
server.post("/create-product", (req, res, next) => {
  Product.findOrCreate({
    where: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    },
  })
    .then((product) => {
      //Sucess handler
      res
        .status(200)
        .send(product[0]);
    })
    .catch((err) => {
      //Error Handler
      console.log(err);
      res.status(400).send("No se pudo crear el producto solicitado");
    });
});

server.get("/search/:search", (req, res, next) => {
  // ruta para buscar un producto segun un keyword, este mismo puede estar
  // en el nombre o en la descripcion
  //en body llega el valor del input del componente SearchBar como 'search'
  Product.findAll({
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${req.params.search}%`,
        },
        description: {
          [Op.iLike]: `%${req.params.search}%`,
        },
      },
    },
  })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => res.status(404).json(err));
});

// Actualiza un producto
server.put("/:idProducto/update", (req, res, next) => {
  const { name, description, price, stock } = req.body;

  Product.findByPk(req.params.idProducto)
    .then((data) => {
      console.log(data);
      if (name) data.name = name;
      if (description) data.description = description;
      if (price) data.price = price;
      if (stock) data.stock = stock;
      data.save();
      res
        .status(200)
        .send(
          `El producto ${data.dataValues.name} con id ${data.dataValues.id} se actualizó con éxito`
        );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = server;