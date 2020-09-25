import React from 'react';
import styles from '../../Styles/productCard.module.css'
// import henryShirt from "../../content/henryShirt.png";


export default function Product(props) {
    const {id, name, description} = props.product;
    const images = props.images;

    const imageBackground = (img) => ({ backgroundImage: `url(./products/${img.source})`, height: '400px'});

    return (
        <div className={styles.container}>
            <div className={styles.card}>       
            
                {images.map((img) => <div style={imageBackground(img)} className={styles.imgBx}></div>)}

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