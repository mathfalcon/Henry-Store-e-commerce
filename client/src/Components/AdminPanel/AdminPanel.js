import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import productForm from "../Product/productForm";
import styles from "../../Styles/productForm.module.css";
import axios from "axios";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /*Peticion GET para obtener array con los productos */
  useEffect(() => getProducts(), []);

  const getProducts = () => {
    fetch("http://localhost:3100/products")
      .then((data) => data.json())
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));
  }
    
  /*Peticion GET para obtener array con las categorias */
  useEffect(() => getCategories(), []);

  const getCategories = () => {
    fetch("http://localhost:3100/products")
      .then((data) => data.json())
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }
  
  const handleDelete = async (id) => {
    console.log(id)
    await axios.delete("http://localhost:3100/products/" + id + "/delete")
  }

  return (
    <BrowserRouter>
      <Route path="/create-product" component={productForm} exact />
      <div className={styles.container}>
        <h2>PANEL DE ADMINISTRADOR</h2>

        {/* Sección Productos */}
        <div className={styles.GestorCard}>
          <h3>GESTOR DE PRODUCTOS</h3>
          <Link to="/create-product" className={styles.CreateButton}>
            CREAR UN NUEVO PRODUCTO
          </Link>
          {/* Mapeo de productos */}
          {products.map((product) => (
            <div className={styles.ItemCard}>
              <h4 key={product.id}>Nombre: {product.name}</h4>
              <h5>Descripción: {product.description}</h5>
              <div>
                <button className={styles.ControlButton}>Actualizar</button>
                <button onClick={() => handleDelete(product.id)} className={styles.ControlButton}>Borrar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sección Categorias */}
        <div className={styles.GestorCard}>
          <h3>GESTOR DE CATEGORIAS</h3>
          <Link to="/create-category" className={styles.CreateButton}>
            CREAR UNA NUEVA CATEGORIA
          </Link>
          {/* Mapeo de categorias */}
          {categories.map((categories) => (
            <div className={styles.ItemCard}>
              <h4 key={categories.id}>Nombre: {categories.name}</h4>
              <h5>Descripción: {categories.description}</h5>
              <div>
                <button className={styles.ControlButton}>Actualizar</button>
                <button className={styles.ControlButton}>Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}
export default AdminPanel;
