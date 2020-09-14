import React, { useState } from "react";
import styles from "../../../Styles/searchBar.module.css";
import logo from "../../../content/logo.png";
//Componente de busqueda de productos mediante una keyword

export default function SearchBar(props) {
  const [value, searchValue] = useState("");
  document.title = "Henry Store";
  return (
    <div className={styles.navBar}>
      <span className={styles.logoSpan}>
        <a href='/'><img src={logo} className={styles.logo} alt="Logo Henry" /></a>
      </span>
      <form className={styles.formSearchBar}
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSearch(value);
        }}>
        <input
          className={styles.inputForm}
          placeholder="Busca un producto..."
          type="text"
          value={value}
          onChange={(e) => {
            searchValue(e.target.value);
          }}
        />
        <input className={styles.searchButton} type="submit" value="BUSCAR" />
      </form>
      <span>
        <a href="#">Registrarse</a>
      </span>
      <span>
        <a href="#">Ingresar</a>
      </span>
      <span className={styles.cartSpan}>
        <a href="http://localhost:3000/user/cart">Carrito</a>
      </span>
    </div>
  );
}
