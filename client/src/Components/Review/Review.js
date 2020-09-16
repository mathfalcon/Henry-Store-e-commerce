import React, { useEffect, useState } from "react";
import styles from "../../Styles/review.module.css";

export default function Review({ product }) {
  const [reviews, setReviews] = useState([]);
  //la Id del producto deberia llegar como props o como parametro
  //const id = product.id
  useEffect(() => getProduct(), []);

  const getProduct = () => {
    /* fetch(`http://localhost:3100/reviews/${id}`) */
    //Usada id 1 para ejemplificar reviews, las id se pasaran por productCard
    
    fetch(`http://localhost:3100/reviews/1`)
      .then((data) => data.json())
      .then((allReviews) => setReviews(allReviews))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.reviewContainer}>
      <h3 className={styles.reviewTittle}>
        Mira las críticas de {product.name}{" "}
      </h3>
        {reviews.map((e) => (
          <div className={styles.reviewCard}>
            <h4>Valoracion: {e.value} de 10</h4>
            <p>{e.review}</p>
          </div>
        ))}
    </div>
  );
}
