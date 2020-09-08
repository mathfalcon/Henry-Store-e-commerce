import React from "react";
import styles from "../../Styles/productCard.module.css";
import henryShirt from "../../content/henryShirt.png";
import { Link } from "react-router-dom";

export default function Product(props) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imgBx}>
          <img src={henryShirt} alt="Henry Shirt" />
        </div>
        <div className={styles.contentBx}>
          <h2>{props.product.name}</h2>
          <div className={styles.description}>
            <p>{props.product.description}</p>
          </div>
          <div className={styles.price}>
            <p>${props.product.price}</p>
          </div>
          <Link
            to={{
              pathname: `/product/detailed/`,
              search: `?id=${props.product.id}`
            }}
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  );
}

// Productos: nombre(titulo), descripcion, precio, cantidad(stock), srcFoto[]
// ( tiene una o muchas categorias)

// Categorias: nombre, descripcion (hasMany ...as)
