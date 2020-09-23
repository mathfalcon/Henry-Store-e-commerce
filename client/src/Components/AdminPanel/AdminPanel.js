import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Styles/adminPanel.module.css";
const axios = require("axios");

function AdminPanel() {
  return (
    <div className={styles.container}>
      <h2>PANEL DE ADMINISTRADOR</h2>

      {/* Sección Productos */}
      <div className={styles.GestorCard}>
        <h3>GESTOR DE PRODUCTOS</h3>
        <Link to="/product/admin/crud" className={styles.CreateButton}>
          CREAR UN NUEVO PRODUCTO
        </Link>
        <br></br>
        <Link to="/product/admin/product-table" className={styles.CreateButton}>
          VER LISTADO DE PRODUCTOS
        </Link>
      </div>

      {/* Sección Categorias */}
      <div className={styles.GestorCard}>
        <h3>GESTOR DE CATEGORIAS</h3>
        <Link
          to="/product/admin/create-category"
          className={styles.CreateButton}
        >
          CREAR UNA NUEVA CATEGORIA
        </Link>
        <br></br>
        <Link to="/product/admin/category-table" className={styles.CreateButton}>
          VER LISTADO DE CATEGORIAS
        </Link>
      </div>

      {/* Sección Ordenes */}
      <div className={styles.GestorCard}>
        <h3>GESTOR DE ORDENES</h3>
        <Link to="/product/admin/show-table" className={styles.CreateButton}>
          VER LISTADO DE ORDENES
        </Link>
      </div>

      {/* Sección Usuarioss */}
      <div className={styles.GestorCard}>
        <h3>GESTOR DE USUARIOS</h3>
        <Link to="/product/admin/list-users" className={styles.CreateButton}>
          VER LISTADO DE USUARIOS
        </Link>
      </div>
    </div>
  );
}
export default AdminPanel;
