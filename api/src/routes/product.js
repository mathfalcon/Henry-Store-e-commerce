const server = require('express').Router();
const { Product, Categories } = require('../db.js');


server.get('/', (req, res, next) => { // Busca todos los productos y los devuelve en un array
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


server.delete('/category/:id', (req, res, next) => {
    const id = req.params.id;

    Categories.destroy(
        { where: { id } }
        )
         .then( rows => res.status(200).json(rows) )
         .catch(next)
});

module.exports = server;

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

module.exports = server;

