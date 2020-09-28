import React from 'react';
import styles from '../../Styles/productCard.module.css'
import henryShirt from "../../content/henryShirt.png";


export default function Product(props) {
    const {id, name, description, images} = props.product
    console.log(images[0])
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imgBx}>
                    <img src={images[0].img} alt="Henry Shirt"/>
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