const server = require('express').Router();
const { Product } = require('../db.js');
const { Categories } = require('../db.js');

server.get('/', (req, res, next) => {
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