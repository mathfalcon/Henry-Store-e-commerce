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
  let [responseData, setResponseData] = useState([]);

  const handleAddQty = useCallback((productId) => {
    var indexOfProductId = storage.findIndex((e) => e.productId === productId);
    storage[indexOfProductId].amount += 1;
    localStorage.setItem("guestCart", JSON.stringify(storage));
    window.location.reload();

    // Por X razon no actualiza el componente tras setear el nuevo estado
    // setResponseData((previousState) => {
    //   var array = previousState;
    //   array[array.findIndex((e) => e.id === productId)].amount += 1;
    //   return array;
    // });
  }, []);
  var storage = JSON.parse(localStorage.getItem("guestCart"));

  const handleRemoveQty = useCallback((productId) => {
    var indexOfProductId = storage.findIndex((e) => e.productId === productId);
    storage[indexOfProductId].amount -= 1;
    localStorage.setItem("guestCart", JSON.stringify(storage));
    window.location.reload();

    // Por X razon no actualiza el componente tras setear el nuevo estado
    // setResponseData((previousState) => {
    //   var array = previousState;
    //   array[array.findIndex((e) => e.id === productId)].amount += 1;
    //   return array;
    // });
  }, []);

  const fetchData = useCallback(() => {
    storage.forEach((e) => {
      axios
        .get(`http://localhost:3100/products/${e.productId}`)
        .then((data) => {
          setResponseData((previousState) =>
            previousState.concat({ ...data.data, amount: e.amount })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // let total = 0;
    // responseData.forEach(e => {
    //   total = e.price * e.amount;
    // })
    // setTotal(total)
  }, []);

  useEffect(() => {
    if (storage) fetchData();
  }, []);

  const handleRemoveAllCart = () => {
    localStorage.removeItem("guestCart");
    window.location.reload();
  };

  const handleRemoveCart = useCallback((productId) => {
    let storageToEdit = JSON.parse(localStorage.getItem("guestCart"));
    var indexOfProductId = storageToEdit.findIndex(
      (e) => e.productId === productId
    );
    storageToEdit.splice(indexOfProductId, 1);
    localStorage.setItem("guestCart", JSON.stringify(storageToEdit));
    window.location.reload();

    // Por X razon no actualiza el componente tras setear el nuevo estado
    // setResponseData((previousState) => {
    //   var array = previousState;
    //   array[array.findIndex((e) => e.id === productId)].amount += 1;
    //   return array;
    // });
  }, []);

  return (
    <div className={styles.title}>
      {userLogged.loggedIn && <Redirect to="/user/cart" />}
      <h1>Carrito de invitado </h1>
      <div className={styles.sectionTable}>
        <table className={styles.cartTable}>
          {responseData[0] ? (
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
                        onClick={(e) => handleAddQty(order.id)}
                        aria-label="add"
                      >
                        <AddIcon className={styles.iconAddRemove} />
                      </IconButton>
                    )}
                    {order.amount > 1 && (
                      <IconButton
                        className={styles.buttonsAddRemove}
                        onClick={(e) => handleRemoveQty(order.id)}
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
                      onClick={() => handleRemoveCart(order.id)}
                    />
                  </a>
                </tr>
              </tbody>
            ))
          ) : (
            <div>
              <h1 style={{ color: "white" }}>
                No tienes ningun producto en el carrito
              </h1>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  maxWidth: "200px",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                href="http://localhost:3000/#section-two"
              >
                Ir al catalogo
              </Button>
            </div>
          )}
        </table>
        {responseData[0] && (
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
        )}
      </div>
      <h2></h2>
      {/* No lo pude hacer funcionar <h2>Total: ${totalPrice}</h2> */}
    </div>
  );
}

export default GuestCart;
