import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown"

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
      <form onSubmit={handleSubmit}>
        <label>Nombre: </label>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Ingrese nombre del producto"
        />
        <label>Descripcion: </label>
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Descripcion del producto"
        />
        <label>Precio: </label>
        <input
          type="number"
          placeholder="0.00"
          name="price"
          min="0.00"
          step="0.01"
          onChange={handleChange}
        />
        <label>Stock: </label>
        <input
          type="number"
          placeholder="0"
          name="stock"
          min="0"
          step="1"
          onChange={handleChange}
        />
      </form>
      <h1>
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
      </h1>
      {/* Selector multiple de categorias */}
      <div>
        <Multiselect options={options} displayValue="Category"/>
      </div>
    </div>
  );
}
export default ProductForm;