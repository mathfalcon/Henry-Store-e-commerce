const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => { // Busca todos los productos y los devuelve en un array
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

module.exports = server;
