import React, { useState, useEffect, useCallback } from "react";
import styles from "../../Styles/cart.module.css";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function GuestCart() {
  const [totalPrice, setTotal] = useState(0);

  const userLogged = useSelector((state) => state.authUser);
  const [productsInfo, setProducts] = useState([]);
  let [responseData, setResponseData] = useState([]);

  const fetchData = useCallback(() => {
    var array = [];
    JSON.parse(localStorage.getItem("guestCart")).forEach((e) => {
      axios
        .get(`http://localhost:3100/products/${e.productId}`)
        .then((data) =>
          setResponseData((previousState) => previousState.concat({...data.data, amount: e.amount}))
        )
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("guestCart"))) fetchData();
  }, []);

  const handleRemoveAllCart = () => {
    localStorage.removeItem('guestCart')
  }
  return (
    <div className={styles.title}>
      {console.log(responseData)}
      {userLogged.loggedIn && <Redirect to="/user/cart" />}
      <h1>Carrito de invitado {productsInfo}</h1>
      <div className={styles.sectionTable}>
        <table className={styles.cartTable}>
          {responseData &&
            responseData.map((order, index) => (
              <tbody key={index}>
                <tr>
                  {/* <td>Imagen</td> */}
                  <td style={{ color: "white" }}>{order.name}</td>
                  <td style={{ color: "white" }}>{order.description}</td>
                  <td style={{ color: "white" }}>
                    Cantidad a comprar: {order.amount}
                  </td>
                  <td style={{ color: "white" }}>
                    {order.amount > -1 && (
                      <IconButton
                        className={styles.buttonsAddRemove}
                        // onClick={(e) => handleAddQty(order.id)}
                        aria-label="add"
                      >
                        <AddIcon className={styles.iconAddRemove} />
                      </IconButton>
                    )}
                    {order.amount > 1 && (
                      <IconButton
                        className={styles.buttonsAddRemove}
                        // onClick={(e) => handleRemoveQty(order.id)}
                        aria-label="add"
                      >
                        <RemoveIcon className={styles.iconAddRemove} />
                      </IconButton>
                    )}
                  </td>
                  <td style={{ color: "white" }}>${order.price}</td>
                  <a href="#">
                    <CancelIcon
                      style={{ color: "white", marginTop: "12px" }}
                      className={styles.buttonsRemove}
                      key={index}
                    //   onClick={() => handleRemoveCart(order.id)}
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

export default GuestCart;
