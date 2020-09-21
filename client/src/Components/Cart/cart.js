import React, { useState, useEffect } from "react";
import styles from "../../Styles/cart.module.css";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Cart() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotal] = useState(0);

  //Asignando el hook de dispatch a una constante
  //Se asigna el valor de userLogged por destructuring
  const {userLogged} = useSelector((state) => state.authUser);

  useEffect(() => {
    if(userLogged.id) getOrders();
  }, [userLogged]);

  const getOrders = () => {
    axios.get(`http://localhost:3100/users/${userLogged.id}/orders`).then((response) => { // Looks for users' orders
      const activeOrder = response.data.find((e) => e.state = 'active');
      axios.get(`http://localhost:3100/orders/products/${activeOrder.id}`)  //Looks for the information of the active order
        .then((data) => {
          setOrders(data.data[0]);
          let total = 0;
          data.data[0].products.forEach((e) => (total += e.price * e.amount.amount));
          setTotal(total);
        })
        .catch((err) => console.log(err));
    });
  };
  const handleRemoveCart = (id) => {
    console.log(orders);
    axios({
      method: "delete",
      url: `http://localhost:3100/users/${orders.id}`,
      data: {
        product: id,
      },
    }).then((data) => getOrders());
  };

  const handleRemoveAllCart = () => {
    orders.products.forEach((e) => {
      axios({
        method: "delete",
        url: `http://localhost:3100/users/${orders.id}`, 
        data: {
          product: e.id,
        },
      }).then((data) => getOrders());
    });
  };

  const handleAddQty = (productId) => {
    axios({
      method: "put", 
      url: `http://localhost:3100/users/${userLogged.id}/cart`, 
      data: {
        productId: productId,
        orderId: orders.id,
        amountToSet: 1,
      },
    }).then((data) => getOrders());
  };

  const handleRemoveQty = (productId) => {
    axios({
      method: "put",
      url: `http://localhost:3100/users/${userLogged.id}/cart`, //cuando se cree el sistema de autentificacion el "1" deberia ser reemplazado por el id del usuario
      data: {
        productId: productId,
        orderId: orders.id,
        amountToSet: -1,
      },
    }).then((data) => getOrders());
  };

  return (
    <div className={styles.title}>
      {!userLogged.id && <Redirect to='/guest/cart'/>}
      <h1>ID de la orden: {orders.id}</h1>
      <div className={styles.sectionTable}>
        <table className={styles.cartTable}>
          {orders.products &&
            orders.products.map((order, index) => (
              <tbody key={index}>
                <tr>
                  {/* <td>Imagen</td> */}
                  <td style={{color: "white"}}>{order.name}</td>
                  <td style={{color: "white"}}>{order.description}</td>
                  <td style={{color: "white"}}>Cantidad a comprar: {order.amount.amount}</td>
                  <td style={{color: "white"}}>
                    {order.amount.amount > -1 && (
                      <IconButton
                        className={styles.buttonsAddRemove}
                        onClick={(e) => handleAddQty(order.id)}
                        aria-label="add"
                      >
                        <AddIcon className={styles.iconAddRemove} />
                      </IconButton>
                    )}
                    {order.amount.amount > 1 && (
                      <IconButton
                        className={styles.buttonsAddRemove}
                        onClick={(e) => handleRemoveQty(order.id)}
                        aria-label="add"
                      >
                        <RemoveIcon className={styles.iconAddRemove} />
                      </IconButton>
                    )}
                  </td>
                  <td style={{color: "white"}}>${order.price}</td>
                  <a href="#">
                    <CancelIcon
                      style={{ color: "white", marginTop: "12px" }}
                      className={styles.buttonsRemove}
                      key={index}
                      onClick={() => handleRemoveCart(order.id)}
                    />
                  </a>
                </tr>
              </tbody>
            ))}
        </table>
        <Button
          variant="contained"
          style={{
            backgroundColor: "black",
            color: "white",
            maxWidth: "200px",
            marginTop: "15px",
          }}
          onClick={handleRemoveAllCart}
        >
          VACIAR CARRITO
        </Button>
      </div>
      <h2>Total: ${totalPrice}</h2>
    </div>
  );
}

export default Cart;