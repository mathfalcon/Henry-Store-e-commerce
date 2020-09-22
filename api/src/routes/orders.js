const server = require("express").Router();
const { Order, OrderLine, Product, Users } = require("../db.js");

// Busca todas las ordenes y los devuelve en un array y filtra si posee query con status
//no se puede testear por que no existe ruta para crear ordenes
server.get("/", (req, res, next) => {
  var status = req.query.status;
  if (!status) {
    Order.findAll({
      include: Users,
      paranoid: true
    })
      .then((orders) => {
        res.status(200).send(orders);
      })
      .catch(next);
  } else {
    Order.findAll({ where: { state: status }, paranoid: false })
      .then((orders) => {
        res.status(200).send(orders);
      })
      .catch(next);
  }
});

server.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { state } = req.query;
  //Lo unico que podemos buscar editar es el estado de una orden
  // este estado deberia solo puede tener los values: ['inCart', 'created', 'processing','canceled','complete']
  // dichas limitaciones deben controlarse desde el frontend, y mandar el estado a editar como query ej: http://localhost:3100/orders/1?state=completed

  Order.findByPk(id)
    .then((order) => {
      if (state) order.state = state;
      order.save().catch(next);
      res.status(200).send(order);
    })
    .catch(next);
});

//Trae todos los productos de una orden
server.get("/products/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  Order.findAll({
    where: {
      id: orderId
    },
    include: [{
      model: Product,
      as: 'products',
      required: false,
      // Pass in the Product attributes that you want to retrieve
      attributes: ['id', 'name','description','stock','price'],
      through: {
        // This block of code allows you to retrieve the properties of the join table
        model: OrderLine,
        as: 'amount',
        attributes: ['amount'],
      }
    }]
  })
    .then((order) => {
      res.status(200).send(order);
    })
    .catch(next);
});

module.exports = server;
