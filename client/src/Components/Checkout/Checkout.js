import React, { useState } from "react";
import axios from "axios";
import styles from "../../Styles/checkout.module.css";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Checkout() {

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cash");

  let { idUser } = useParams();
  let { idOrder } = useParams();

  /* //Estado para Alerta checkout completado
  const [openCreate, setOpenCreate] = useState(false);

  //Funciones para control de Alerta checkout completado
  
  const handleCloseCreate = () => {
    setOpenCreate(false);
    window.location.href = "http://localhost:3000/catalogo";
  }; */
  
  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `http://localhost:3100/checkouts/${idUser}/add`,
      data: {
        address: address,
        payment: payment,
      },
    })
      .then(() => {
        axios({
          method: "put",
          url: `http://localhost:3100/orders/${idOrder}?state=complete`,
        }).then(() => {
          alert("La compra se ha confirmado con éxito.")
          window.location.href = "http://localhost:3000/"
        });
      })
      .catch((err) => console.log(err));
    setAddress("");
    setPayment("cash");
  };
  const handleChange = (e) => {
    setAddress(e.target.value);
  };
  const handleSelected = () => {
    var selected = document.getElementById("select").value;
    setPayment(selected);
  };

  return (
    <div className={styles.checkoutContainer}>
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <h2 className={styles.checkoutTittle}>CHECKOUT</h2>
        <h3 className={styles.checkoutLabel}>
          {" "}
          Seleccione su metodo de pago:{" "}
        </h3>
        <select
          name="payment"
          id="select"
          onChange={handleSelected}
          className={styles.checkoutSelect}
        >
          <option name="cash" value="cash">
            Efectivo
          </option>
          <option name="card" value="card">
            Tarjeta
          </option>
        </select>
        <h3 className={styles.checkoutLabel}>
          Ingrese su dirección de envio:{" "}
        </h3>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          className={styles.checkoutInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          //onClick={() => handleSend()}
          style={{
            backgroundColor: "#ffff5a",
            color: "black",
            marginTop: "1em",
          }}
        >
          CONFIRMAR COMPRA
        </Button>
      </form>
     {/*  <Snackbar
        open={openCreate}
        autoHideDuration={7000}
        onClose={handleCloseCreate}
        >
        <Alert
          onClose={handleCloseCreate}
          severity="success"
          style={{ backgroundColor: "#ffff5a", color: "black" }}
        >
          La compra se ha confirmado con éxito.
        </Alert>
      </Snackbar> */}
    </div>
  );
}
