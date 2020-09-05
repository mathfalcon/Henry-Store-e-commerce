import React, { useState } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";
import henryShirt from "../../content/henryShirt.png";

export default function Landing(props) {
  return (
    <body>
      <section id="section-one">
        <div className={styles.textBox}>
          <h2>BIENVENIDO A</h2>
          <img className={styles.henryLogo} src={logoText} />
          <p>STORE</p>
          <a href="#">VER CATÁLOGO</a>
        </div>
        <div className={styles.divFeaturedItem}>
          <img src={henryShirt} className={styles.henryShirt} />
          <span>
            <p>Remera deportiva HENRY</p>
          </span>
        </div>
        <footer>{/* <img src={}/> */}</footer>
      </section>
      <section id="section-two">

      </section>
    </body>
  );
}
