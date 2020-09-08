import React, { useEffect, useState } from 'react';
import styles from '../../Styles/productDetailed.module.css'
import henryShirt from '../../content/henryShirt.png'
import { Link } from 'react-router-dom';
//Componente productCard
//Falta el img_src
const ProductCard = (props) => {
    const id = window.location.search.split("=").pop();
    console.log(id)
    const [product, setProduct] = useState({})
    useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((data) => data.json())
      .then((data) => setProduct(data));
    }, [])
    console.log(product);

    return (
        <div className={styles.mainDiv}>
            <img src={henryShirt} alt="Imagen del producto"/>
            <h1>{product.name}</h1>
            <h3>{product.description}</h3>
            <h4>${product.price}</h4>

            <h5>En Stock: {product.stock}</h5>
            <Link to="#">Comprar</Link>
        </div>
    );
}

export default ProductCard;
//productCard recibe name(titulo) y price