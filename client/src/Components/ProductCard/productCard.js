import React from 'react';

//Componente productCard
//Falta el img_src
const productCard = ({ product: { name, price } }) => {
    return (
        <div>
            <img src="" alt="Imagen del producto"/>
            <h1>Nombre:{ name }</h1>
            <h2>${ price }</h2>
        </div>
    );
}

export default productCard;
//productCard recibe name(titulo) y price