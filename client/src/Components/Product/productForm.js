import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown"
import styles from "../../Styles/productForm.module.css";

function ProductForm() {
  /* Categorias de ejemplo */
  const data = [
    {Category: "Category1", id: 1},
    {Category: "Category2", id: 2},
    {Category: "Category3", id: 3},
    {Category: "Category4", id: 4}
  ]
  const [options] = useState(data);
  /* Estados */
  const [state, setState] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(state);
  return (
    <div>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={styles.name}>
              <label>Name</label>
              <br />
              <input
                name="name"
                onChange={handleChange}
              /><br />
          </div>
          <div className={styles.description}>
              <label>Description</label>
              <br />
              <textarea
                name="description"
                onChange={handleChange}
              /><br />
          </div>
          <div className={styles.priceStock}>
              <label>Price</label>
              <br />
              <input
                type="number"            
                name="price"
                min="0.00"
                step="0.01"
                onChange={handleChange}            
              />          
          
              <label>Stock</label>
              <br />
              <input
                type="number"            
                name="stock"
                min="0"
                step="1"
                onChange={handleChange}
              />
              </div>
          </div>

          <div className={styles.buttons}>
            <h3>
                Product Management
            </h3>
            <button type="submit">
                Create
            </button>
            <button type="submit">
                Update
            </button>
            <button type="submit">
                Delete
            </button>
            <img className={styles.imgLogo} src="" alt="logoHenry" />
        </div>

      </form>

      {/* <h1>
        Nombre: 
        <p>{state.name}</p> 
      </h1>
      <h1>
        Descripcion: 
        <p>{state.description}</p>
      </h1>
      <h1>
         Price:
        <p>${state.price}</p> 
      </h1>
      <h1>
        Stock: 
        <p>{state.stock}</p>
      </h1> */}

      {/* Selector multiple de categorias */}

      {/* <div>
        <Multiselect options={options} displayValue="Category"/>
      </div> */}

    </div>
  );
}
export default ProductForm;