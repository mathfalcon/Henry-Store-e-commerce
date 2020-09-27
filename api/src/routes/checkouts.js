const server = require("express").Router();
const { Checkout } = require("../db.js");

//Ruta que trae todos los checkouts
server.get("/", (req, res, next) => {
  Checkout.findAll()
    .then((data) => res.status(200).send(data))
    .catch(next);
});

//Ruta para agregar una direccion y un medio de pago a un usuario
server.post("/:idUser/add/", (req, res, next) => {
    const { idUser } = req.params;
    const { address, payment, orderId } = req.body;
    
    Checkout.create({
        address: address,
        payment: payment,
        userId: idUser,
        orderId: orderId
    }).then(data => res.status(200).json(data))
    .catch(next)
  });

//Ruta para modificar un checkout
server.put("/:idUser/update", (req, res, next) => {
  const { idUser } = req.params;
  const { address, payment } = req.body;
  
  Checkout.findByPk(idUser)
  .then(data => {
    if(address) data.address = address;
    if(payment) data.payment = payment;
    if(idUser) data.userId = idUser;
    data.save()
    res.status(200).send(data)
  })
  .catch(next)
});

//Elimina un checkout segun su id
server.delete("/:id/delete", (req, res, next) => {
  const id = req.params.id;

  Checkout.destroy({ where: { id } })
    .then((rows) => res.status(200).json(rows))
    .catch(next);
});

module.exports = server;