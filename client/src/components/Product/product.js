import React from 'react';

//img_src?
const Product = ({ product: { name, description, price, stock } }) => {
    return (
        <div>
            <h1>Producto: { name }</h1>
            <p>{ description }</p>
            <label>Precio: { price }</label>
            <br />
            <label>Cantidad: { stock }</label>
        </div>
    );
}

export default Product;


// Productos: nombre(titulo), descripcion, precio, cantidad(stock), srcFoto[]
// ( tiene una o muchas categorias)

// Categorias: nombre, descripcion (hasMany ...as)