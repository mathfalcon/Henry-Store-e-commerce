const server = require("express").Router();
const { Users, OrderLine, Order } = require("../db.js");

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
  
  //hay que editarla, deberia crear una orden con status created, la order line deberia filtrar las ordenes de un usuario y si encuentra una que este
  // 'activa' deberia agregar orderline a esa orden, en este caso la ordenline se crea al crear la orden, no cumple el proposito de una orden muchas orderlines.

  const {idUser} = req.params;
  const {idProducto, amount, price} = req.body;

  Order.create({
    state: 'created',
    userId: idUser,
  }).then((data) =>{
    OrderLine.create({
      amount: amount,
      price: price,
      orderId: data.id,
      productId: idProducto
    }).then((data) => res.status(200).send(data))
    .catch((err)=> res.status(204).send(next))
  }).catch((err) => res.status(204).send(next))
});

// Ruta para editar las cantidades de un producto
server.put("/:idUser/cart", (req, res, next) => {
  //suponiendo que en req.body viene el id del producto como 'productId', el id de la orden a editar como 'orderId' y la cantidad a setear como 'amountToSet'
  // la cantidad de items como 'amount' y el precio como 'price'
  
  const {idUser} = req.params;
  const {productId, orderId, amountToSet} = req.body;

  Order.findOne({
    where: {
      userId: idUser,
      id: orderId
    },
    include: OrderLine,
  }).then(orders => {
    const toEdit = orders.orderLines.find((e) => e.productId == productId);
    toEdit.amount = Number(amountToSet);
    toEdit.save();
    res.status(200).send() //No responde nada, ya que solo actualiza, si se quiere mandar un mensaje al usuario hacerlo en base al statusCode
    })
  .catch(err => res.status(204).send(err))

});

//Borra una orden. Al borrarla tambien se borra la relacion con el usuario, por lo tanto vacia el carrito.
server.delete("/:idOrder", (req, res, next) => {
	let id = req.params.idOrder;
	Order.destroy({
		where: {
			id
		}
	}).then((deleted) => {
		res.status(200).send(`Se borraron un total de ${deleted} orden/es`)
	}).catch((err) => {
		res.status(400).send('El id de la orden provisto no existe en la base de datos');
	})
});


module.exports = server;