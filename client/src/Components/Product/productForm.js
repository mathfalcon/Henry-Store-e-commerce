import React, { Component } from "react";

export default class ProductForm extends Component {
  state = {};
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Nombre: </label>
        <input
          name="name"
          onChange={this.handleChange}
          placeholder="Ingrese nombre del producto"
        />
        <label>Descripcion: </label>
        <textarea
          name="description"
          onChange={this.handleChange}
          placeholder="Descripcion del producto"
        />
        <label>Precio: </label>
        <input
          type="number"
          placeholder="0.00"
          name="price"
          min="0.00"
          step="0.01"
          onChange={this.handleChange}
        />
        <label>Posee Stock</label>
        <input type="checkbox" name="stock" onChange={this.handleChange} />
        {/* Agregar, eliminar categorias con checkboxs */}
        <label> Categorias: </label>
        <div>
          <label>Categoria 1</label>
          <input type="checkbox" name="Categoria 1"/>
        </div>
        <div>
          <label>Categoria 2</label>
          <input type="checkbox" name="Categoria 2"/>
        </div>        
        <div>
          <label>Categoria 3</label>
          <input type="checkbox" name="Categoria 3"/>
        </div>
        {/* Botón de enviar formulario */}
        <input type="submit" />
      </form>
    );
  }
}