import React from 'react';

//img_src?

const Product = (ProductExample) => {
    return (
        <div>
            <h1>Producto: { ProductExample.name }</h1>
            <p>{ ProductExample.description }</p>
            <label>Precio: { ProductExample.price }</label>
            <br />
            <label>Cantidad: { ProductExample.cantidad }</label>
        </div>
    );
}

export default Product;


// Productos: nombre(titulo), descripcion, precio, cantidad(stock), srcFoto[]
// ( tiene una o muchas categorias)

// Categorias: nombre, descripcion (hasMany ...as)