const server = require('express').Router();
const { Product , Categories} = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//No se puede testear ya que no esta creada la ruta para añadir categorias.
server.delete('/delete-category/:idCategory', (req, res, next) => {
	Categories.destroy({
		where: {
		   id: req.params.idCategory
		}
	 }).then(function(rowDeleted){
	   if(rowDeleted === 1){
		  console.log('Categoria borrada de manera exitosa');
		}
	 }, function(err){
		 console.log(err); 
	 });
});

module.exports = server;
