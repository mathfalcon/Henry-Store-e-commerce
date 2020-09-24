import React, { useState } from "react";
import axios from "axios";
import styles from "../../Styles/checkout.module.css";
import Button from "@material-ui/core/Button";

export default function Checkout() {
    
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = () => {
     axios({
      method: "post",
      url: "http://localhost:3100/checkouts/1/add",
      data: {
        address: address,
        payment: payment
      },
    })
      .then(() => {
        alert("La compra se ha confirmado con éxito");
      })
      .catch((err) => console.log(err));
    setAddress("");
    setPayment("");     
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
        <h3 className={styles.checkoutLabel}> Seleccione su metodo de pago: </h3>
        <select name="payment" id="select" onChange={handleSelected} className={styles.checkoutSelect}>
            <option name="cash" value="cash">Efectivo</option>
            <option name="card" value="card">Tarjeta</option>
          </select>
        <h3 className={styles.checkoutLabel}>Ingrese su dirección de envio: </h3>
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
              // onClick={handleSend}
              style={{ backgroundColor: "#ffff5a", color: "black" , marginTop: "1em"}}
            >
              CONFIRMAR COMPRA
        </Button>
      </form>
    </div>
  );
}
