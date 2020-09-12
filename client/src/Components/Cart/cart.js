import React, { useState, useEffect } from "react";
import styles from "../../Styles/cart.module.css";
import CancelIcon from '@material-ui/icons/Cancel';

function Cart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => getOrders(), []);

  //en un futuro cuando se implemente la autenticacion, se haria un fetch segun el id del usuario para traer sus
  const getOrders = () => {
    fetch("http://localhost:3100/orders/products/2")
      .then((data) => data.json())
      .then((data) => {
        setOrders(data[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.title}>
      <h1>ID de la orden: {orders.id}</h1>
      <div className={styles.sectionTable}>
        <table className={styles.cartTable}>
          {orders.products &&
            orders.products.map((order, index) => (
              <tbody>
                <tr key={index}>
                  <td>Imagen</td>
                  <td>{order.name}</td>
                  <td>{order.description}</td>
                  <td>Cantidad a comprar: {order.amount.amount}</td>
                  <td>${order.price}</td>
                  <a href='#'><CancelIcon style={{ color: 'white' }}/></a>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      <h2>$Subtotal</h2>
      <h2>$Total</h2>
    </div>
  );
}

export default Cart;
