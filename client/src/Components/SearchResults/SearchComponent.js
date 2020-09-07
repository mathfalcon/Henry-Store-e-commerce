import React from "react";
import styles from '../../Styles/searchComponent.module.css'

export default function SearchResults(props) {
  const { name, price, stock, description, id } = props.product;

  return (
    <div className={styles.divResults}>
      <a href='#'><h1>{name}</h1></a>
      <h2>{price}</h2>
      <h3>{`Cantidad en stock: ${stock}`}</h3>

      <p>{description}</p>
      <span>{`ID del Producto: ${id}`}</span>
    </div>
  );
}
