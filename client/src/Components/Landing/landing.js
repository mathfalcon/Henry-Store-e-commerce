import React, { useState, useEffect } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";
import Product from '../Product/product.js'

export default function Landing(props) {
  document.title = 'Henry Store';
  const [allProducts, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/products/')
    .then((data) => data.json())
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
  }, [])
  return (
    <body>
      <section id="section-one">
        <div className={styles.textBox}>
          <h2>BIENVENIDO A</h2>
          <img className={styles.henryLogo} src={logoText} alt='Logo Henry' />
          <p>STORE</p>
          <a href="#section-two">VER CATÁLOGO</a>
        </div>
        
      </section>
      <section id="section-two" className={styles.productSection}>
        <span><h1>CATÁLOGO</h1></span>
        {allProducts.map((el,index)=> {
          return <Product product={el} key={index}/>
        })}
      </section>
    </body>
  );
}
