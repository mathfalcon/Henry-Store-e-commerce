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
        <input type="submit" />
      </form>
    );
  }
}