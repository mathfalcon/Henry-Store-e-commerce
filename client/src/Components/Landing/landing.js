import React, { Fragment, useState, useEffect } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";
import Product from "../Product/product.js";
import ReactSelectMaterialUi from "react-select-material-ui";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

export default function Landing() {
  const [allProducts, setProducts] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [selectedCategory, setCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3100/categories/category/${selectedCategory}`)
        .then((data) => data.json())
        .then((data) => setProducts(data.products))
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:3100/products/")
        .then((data) => data.json())
        .then((data) => {
          data.forEach((e) => {
            if (e.stock > 0) allProducts.push(e);
          });
        })
        .catch((err) => console.log(err));
    }
    fetch("http://localhost:3100/categories")
      .then((data) => data.json())
      .then((data) => setCategories(data));
  }, [selectedCategory]);

  const options = allCategories.map((e) => e.name);
  const handleCategoryChange = function (selectedCategory) {
    setCategory(selectedCategory);
  };

  return (
    <Fragment>
      <section id="section-one">
        <div className={styles.textBox}>
          <h2>BIENVENIDO A</h2>
          <img className={styles.henryLogo} src={logoText} alt="Logo Henry" />
          <p>STORE</p>
          <a href="#section-two">VER CATÁLOGO</a>
        </div>
      </section>
      <section id="section-two" className={styles.productSection}>
        <div className={styles.divSelector}>
          <span>
            <h1>CATÁLOGO</h1>
          </span>

          <ReactSelectMaterialUi
            className={styles.selectCategory}
            value={"Selecciona una categoría"}
            options={options}
            onChange={handleCategoryChange}
          />
        </div>
        {allProducts.map((el, index) => (
          <Product product={el} key={index} />
        ))}
      </section>
    </Fragment>
  );
}
