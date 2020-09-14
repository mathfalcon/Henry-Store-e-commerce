import React from 'react';
import styles from '../../Styles/productCard.module.css'
import henryShirt from "../../content/henryShirt.png";


export default function Product(props) {
    const {id, name, description} = props.product
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imgBx}>
                    <img src={henryShirt} alt="Henry Shirt"/>
                </div>
                <div className={styles.contentBx}>
                    <h2>{name}</h2>
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>
                    <a href={`http://localhost:3000/product/detailed/${id}`}>ver más</a>
                </div>
            </div>
        </div>
    );
}


// Productos: nombre(titulo), descripcion, precio, cantidad(stock), srcFoto[]
// ( tiene una o muchas categorias)

// Categorias: nombre, descripcion (hasMany ...as)