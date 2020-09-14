import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import styles from "../../Styles/adminPanel.module.css";
const axios = require("axios");


function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleted, setStatus] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [redirectProduct, setRedirectProduct] = useState(false);
  const [idCategoria, setIdCategoria] = useState('')
  const [idProduct, setIdProduct] = useState('')


  /*Peticion GET para obtener array con los productos */
  useEffect(() => getProducts(), []);

  const getProducts = () => {
    fetch("http://localhost:3100/products")
      .then((data) => data.json())
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));
  };

  /*Peticion GET para obtener array con las categorias */
  useEffect(() => getCategories(), []);

  const getCategories = () => {
    fetch("http://localhost:3100/categories")
      .then((data) => data.json())
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  };

  const handleDeleteProduct = async (id) => {
    fetch(`http://localhost:3100/products/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => window.location.href = ("http://localhost:3000/product/admin"))
      .catch((err) => console.log(err));
    console.log(deleted);
  };

  const handleDeleteCategory = async (id) => {
    fetch(`http://localhost:3100/products/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => window.location.href = ("http://localhost:3000/product/admin"))
      .catch((err) => console.log(err));
    console.log(deleted);
  };

  const handleUpdateProduct = (id) => {
    setIdProduct(id)
    setRedirectProduct(true)
  };

  const handleUpdateCategory = (id) => {
    setIdCategoria(id);
    setRedirect(true)
  };

  return (
    <div className={styles.container}>
      <h2>PANEL DE ADMINISTRADOR</h2>

      {/* Sección Productos */}
      <div className={styles.GestorCard}>
        <h3>GESTOR DE PRODUCTOS</h3>
        <Link to="/product/crud" className={styles.CreateButton}>
          CREAR UN NUEVO PRODUCTO
        </Link>
        {/* Mapeo de productos */}
        {products.map((product,index) => (
          <div className={styles.ItemCard} key={index}>
            <h4 key={product.id}>Nombre: {product.name}</h4>
            <h5>Descripción: {product.description}</h5>
            <div>
              <button
                id={product.id}
                className={styles.ControlButton}
                onClick={(e) => handleUpdateProduct(e.target.id)}
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className={styles.ControlButton}
              >
                Borrar
              </button>
            </div>
            {redirectProduct && (
              <Redirect
                to={{
                  pathname: "/product/update",
                  search: `?id=${idProduct}`,
                }}
              />
            )}
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
        {categories.map((categories,index) => (
          <div className={styles.ItemCard} key={index}>
            <h4>{categories.id}</h4>
            <h4 key={categories.id}>Nombre: {categories.name}</h4>
            <h5>Descripción: {categories.description}</h5>
            <div>
              <button id={categories.id}
                className={styles.ControlButton}
                onClick={(e) => handleUpdateCategory(e.target.id)}
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDeleteCategory(categories.id)}
                className={styles.ControlButton}
              >
                Borrar
              </button>
            </div>
            {redirect && (
              <Redirect
                to={{
                  pathname: "/categories/update",
                  search: `?id=${idCategoria}`,
                }}
              />
            )}
          </div>
        ))}
      </div>


        {/* Sección Ordenes */}
        <div className={styles.GestorCard}>
          <h3>LISTADO DE ORDENES</h3>
          <Link to="/show-table" className={styles.CreateButton}>
            VER LISTADO DE ORDENES
          </Link>
        </div>

        {/* Sección Usuarioss */}
        <div className={styles.GestorCard}>
          <h3>LISTADO DE USUARIOS</h3>
          <Link to="/list-users" className={styles.CreateButton}>
            VER LISTADO DE USUARIOS
          </Link>
        </div>

      </div>
  );
}
export default AdminPanel;

