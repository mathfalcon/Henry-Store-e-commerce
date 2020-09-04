const server = require('express').Router();
const { Product, Categories } = require('../db.js');
const { Op } = require("sequelize");

server.get('/', (req, res, next) => { // Busca todos los productos y los devuelve en un array
	Product.findAll()
		.then(products => {
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

server.get('/categoria/:nombreCat', (req, res, next) => {
	const nombreCat = req.params.nombreCat;
	Product.findAll({
		//revisar este include
		include: [{
			model: Product,
			through: 'categoryId',
			where: { nombreCat }
		}],
	})
	 .then( rows => res.status(200).json(rows) )
	 .catch(next)
});

server.delete('/category/:id', (req, res, next) => {
    const id = req.params.id;

    Categories.destroy(
		{ where: { id } }
		)
         .then( rows => res.status(200).json(rows) )
         .catch(next)
});

server.post('/create-category', (req, res, next) => {
	//Suponiendo que el nombre de la categoria llega como body "name"
	// y la descripcion como 'description'
	Categories.findOrCreate({
		where: {
			name: req.body.name,
			description: req.body.description
		}
	}).then((category) => { //Sucess handler
		res.status(200).send(`La categoría ${category[0].dataValues.name} se creó con exito`);
	}).catch((err) => { //Error Handler
		res.status(400).send('No se pudo crear la categoría solicitada')
	})
		
});
server.post('/create-product', (req, res, next) => {
	// Ruta para crear un producto
	Product.findOrCreate({
		where: {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
		}
	}).then((product) => { //Sucess handler
		res.status(200).send(`El producto ${product[0].dataValues.name} se creó con exito`);
	}).catch((err) => { //Error Handler
		console.log(err);
		res.status(400).send('No se pudo crear el producto solicitado')
	})
		
});

server.get('/search/:search', (req, res, next) => {
	// ruta para buscar un producto segun un keyword, este mismo puede estar
	// en el nombre o en la descripcion
	//en body llega el valor del input del componente SearchBar como 'search'
	Product.findAll({
		where: {
			  [Op.or]: {
				name: {
					[Op.iLike]: `%${req.params.search}%`
				},
				description: {
					[Op.iLike]: `%${req.params.search}%`
				}
			  }
		}
	}).then((products) => {
		res.status(200).json(products);
	}).catch((err) => res.status(404).json(err))
	
});


module.exports = server;

