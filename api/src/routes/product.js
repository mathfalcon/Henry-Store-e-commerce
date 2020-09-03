const server = require('express').Router();

const { Product , Categories} = require('../db.js');

server.get('/', (req, res, next) => { // Busca todos los productos y los devuelve en un array
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
