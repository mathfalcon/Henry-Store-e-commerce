import React, { useState, useEffect } from "react";
import styles from "../../Styles/cart.module.css";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

function Cart() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotal] = useState(0);
  useEffect(() => {
    getOrders()
  }, []);

  //en un futuro cuando se implemente la autenticacion, se haria un fetch segun el id del usuario para traer sus
  //ordenes
  const getOrders = () => {
    fetch("http://localhost:3100/orders/products/1")
      .then((data) => data.json())
      .then((data) => {
        console.log(data[0])
        setOrders(data[0]);
        let total = 0;
        data[0].products.forEach((e) => total += (e.price * e.amount.amount))
        setTotal(total)
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveCart = (id) => {
    console.log(orders.id)
    axios({
      method: "delete",
      url: `http://localhost:3100/users/${orders.id}`, //cuando se cree el sistema de autentificacion el "1" deberia ser reemplazado por el id del usuario
      data: {
        product: id
      },
    }).then(data => getOrders())
  }


  return (
    <div className={styles.title}>
      <h1>ID de la orden: {orders.id}</h1>
      <div className={styles.sectionTable}>
        <table className={styles.cartTable}>
          {orders.products &&
            orders.products.map((order, index) => (
              <tbody key={index}>
                <tr>
                  {/* <td>Imagen</td> */}
                  <td>{order.name}</td>
                  <td>{order.description}</td>
                  <td>Cantidad a comprar: {order.amount.amount}</td>
                  <td>${order.price}</td>
                  <a href="#">
                    <CancelIcon style={{ color: "white" }} key={index} onClick={() => handleRemoveCart(order.id)}/>
                  </a>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      <h2>Total: ${totalPrice}</h2>
    </div>
  );
}

export default Cart;
