import React from "react";
import styles from '../../Styles/productCard.module.css'

export default function Product(props) {
    const { id, name, description } = props.product;    
    const image = props.images[0].source;
    console.log('image',image);
    
    const imageBackground = (image) => ({ backgroundImage: `url(./products/${image})`, height: '400px'});
    
    return (		
        <div className={styles.container}>
            <div className={styles.card}>
            {/* style={imageBackground(image)} */}
                <div style={imageBackground(image)} className={styles.imgBx} />
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