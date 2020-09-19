import React, { useState } from "react";
import NavBar from "../../NavBar/navBar"
import styles from "../../../Styles/searchBar.module.css";
import logo from "../../../content/logo.png";
//Componente de busqueda de productos mediante una keyword

export default function SearchBar(props) {
  const [value, searchValue] = useState("");

  const userLogged = true;

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
      <div className={styles.menuNav}>
        <NavBar />
      </div>
    </div>
  );
}
