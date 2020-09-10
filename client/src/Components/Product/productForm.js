import React, { useState, useEffect } from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import styles from "../../Styles/productForm.module.css";
import logoText from "../../Styles/Assets/logo henry black.png";
import axios from "axios";

function ProductForm() {
  /* Categorias de ejemplo */
  const data = [
    { Category: "Category1", id: 1 },
    { Category: "Category2", id: 2 },
    { Category: "Category3", id: 3 },
    { Category: "Category4", id: 4 },
  ];
  const [options] = useState(data);
  /* Estados */
  const [state, setState] = useState({});
  const [categories, setCategories] = useState([]);

  /* Peticion GET a categories */
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((data) => data.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var selected = [];
    for (var option of document.getElementById("category-select").options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    axios({
      method: "post",
      url: "http://localhost:3000/products/create-product",
      data: {
        name: state.name,
        description: state.description,
        price: state.price,
        stock: state.stock,
      },
    }).then((data) => {if(selected.length > 0){
      var selectedCategoriesId = categories.filter((e) => selected.indexOf(e.id.toString()) !== -1);
      selectedCategoriesId.forEach((e) => {
        axios({
        method: "post",
        url: `http://localhost:3000/products/${data.data.id}/addCategory/${e.id}`,
      })})
      }
    }).then(alert('El producto se ha creado con éxito'))
    .catch((err) => console.log(err));
    setState({ ...state, name: "", description: "", price: "", stock: "" });
  };


  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={styles.name}>

            <label>Nombre</label>
            <br />
            <input name="name" onChange={handleChange} value={state.name} />
            <br />
          </div>
          <div className={styles.description}>
            <label>Descripción</label>
            <br />
            <textarea
              name="description"
              onChange={handleChange}
              value={state.description}
            />
            <br />
          </div>
          <div className={styles.priceStock}>
            <label>Precio</label>
            <br />
            <input
              type="number"
              name="price"
              min="0.00"
              step="0.01"
              onChange={handleChange}
              value={state.price}
            />
            <label>Stock</label>
            <br />
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              onChange={handleChange}
              value={state.stock}
            />
          </div>
          <div>
            <label>Subir Imágenes</label>
            <input type="file" name="dropimage" accept="image/*" />
          </div>
          <div>
            <input
              type="submit"
              className={styles.SubmitButton}
              value="Enviar"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <h3>Gestor de Productos</h3>
          <h2>Crear Producto</h2>
          {/* Selector multiple de categorias */}
          <div className={styles.Multiselect}>
            <h2>Seleccionar Categorias: </h2>
            <select id="category-select" multiple="multiple">
              {categories.length > 0 &&
                categories.map((e, index) => {
                  return <option key={index} value={e.id}>{e.name}</option>;
                })}
            </select>
          </div>
          <img className={styles.imgLogo} src={logoText} alt="logoHenry" />
        </div>
      </form>
    </div>
  );
}
export default ProductForm;
