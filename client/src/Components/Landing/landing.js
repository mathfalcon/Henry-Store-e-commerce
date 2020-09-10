import React, { Fragment, useState, useEffect } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";
import Product from "../Product/product.js";
import ReactSelectMaterialUi from "react-select-material-ui";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

export default function Landing() {
  document.title = "Henry Store";
  const [allProducts, setProducts] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [selectedCategory, setCategory] = useState('');

  useEffect(() => {    
    if (selectedCategory) {
      console.log('selectedCategory',selectedCategory);      
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
        <span>
          <h1>CATÁLOGO</h1>
        </span>

        <ReactSelectMaterialUi
          style={{ width: 100 }}
          value={"Selecciona una categoría"}
          options={options}
          onChange={handleCategoryChange}        
        />

      </section>
        {/* <span className={styles.dropdown}>
          <Dropdown
            className={styles.dropdown}
            controlClassName={styles.control}
            onChange={(e) => handleCategoryChange(e)}
            menuClassName={styles.menu}
            options={options}
            value={"Selecciona una categoría"}
            placeholder="Select an option"
          />
        </span> */}
        { allProducts.map((el, index) => <Product product={el} key={index} /> )}
  </Fragment>       
  )
}