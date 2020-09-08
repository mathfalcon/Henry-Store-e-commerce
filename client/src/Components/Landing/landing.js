import React, { useState, useEffect } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";
import Product from "../Product/product.js";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Landing(props) {
  document.title = "Henry Store";
  const [allProducts, setProducts] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [selectedCategory, setCategory] = useState(undefined);


  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3000/products/category/${selectedCategory}`)
        .then((data) => data.json())
        .then((data) => setProducts(data.products))
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:3000/products/")
        .then((data) => data.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }
    fetch("http://localhost:3000/categories")
      .then((data) => data.json())
      .then((data) => setCategories(data));
  }, []);

  const options = allCategories.map((e) => e.name);

  const handleCategoryChange = function (e) {
    setCategory(e.value);
  };

  console.log(selectedCategory);

  return (
    <body>
      <section id="section-one">
        <div className={styles.textBox}>
          <h2>BIENVENIDO A</h2>
          <img className={styles.henryLogo} src={logoText} alt="Logo Henry" />
          <p>STORE</p>
          <a href="#section-two">VER CATÁLOGO</a>
        </div>
      </section>
      <section id="section-two" className={styles.productSection}>
        <span>
          <h1>CATÁLOGO</h1>
        </span>
        <span className={styles.dropdown}>
          <Dropdown
            className={styles.dropdown}
            controlClassName={styles.control}
            onChange={(e) => handleCategoryChange(e)}
            menuClassName={styles.menu}
            options={options}
            value={"Selecciona una categoría"}
            placeholder="Select an option"
          />
        </span>
        {allProducts.map((el, index) => {
          return <Product product={el} key={index} />;
        })}
      </section>
    </body>
  );
}
