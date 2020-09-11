const server = require("express").Router();
const { Users, OrdersLines, Orders } = require("../db.js");

// Busca todos los usuarios y los devuelve en un array
server.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

//Modifica un usuario pasado por id (query)
server.put("/:id", (req, res, next) => {

  const { name, username, email } = req.body;

  Users.findByPk(req.params.id)
    .then((data) => {
      if (name) data.name = name;
      if (username) data.username = username;
      if (email) data.email = email;
      data.save();
      res
        .status(200)
        .send(
          `El usuario ${data.dataValues.name} con id ${data.dataValues.id} se actualizó con éxito`
        );
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});


// Ruta para crear un usuario
server.post("/create", (req, res, next) => {
  Users.findOrCreate({
    where: {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    },
  })
    .then((user) => {
      //Sucess handler
      res
        .status(200)
        .send(user[0]);
    })
    .catch((err) => {
      //Error Handler
      console.log(err);
      res.status(400).send("No se pudo crear el usuario solicitado");
    });
});

// Ruta para crear una orden a partir de un producto
server.post("/:idUser/cart", (req, res, next) => {
  //suponiendo que en req.body viene el id del producto como 'idProducto'
  // la cantidad de items como 'amount' y el precio como 'price'
  
  const {idUser} = req.params;
  const {idProducto, amount, price} = req.body;

  Orders.create({
    state: 'created',
    userId: idUser,
  }).then((data) =>{
    OrdersLines.create({
      amount: amount,
      price: price,
      orderId: data.id,
      productId: idProducto
    }).then((data) => res.status(200).send(data)).catch((err)=> res.status(204).send(err))
  }).catch((err)=> res.status(204).send(err))
});

//Borra una orden. Al borrarla tambien se borra la relacion con el usuario, por lo tanto vacia el carrito.
server.delete("/:idOrder", (req, res, next) => {
	let id = req.params.idOrder;
	Orders.destroy({
		where: {
			id
		}
	}).then((deleted) => {
		res.status(200).send(`Se borraron un total de ${deleted} orden/es`)
	}).catch((err) => {
		res.status(400).send('El id de la orden provisto no existe en la base de datos');
	})
});

//Ruta que retorna todas las ordenes de los usuarios
server.get("/:userId/orders", (req, res, next) => {
  const id = req.params.userId;
  Users.findOne({
    where: {
      id: id
    },
    include: Orders,
  })
    .then((rows) => res.status(200).json(rows))
    .catch(next);
});

module.exports = server;
