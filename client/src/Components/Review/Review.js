import React, { useEffect, useState } from "react";
import styles from "../../Styles/review.module.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Review({ product }) {
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(null);

  //la Id del producto deberia llegar como props o como parametro
  //const id = product.id
  useEffect(() => getProduct(), [product.id]);

  const getProduct = () => {
    /* fetch(`http://localhost:3100/reviews/${id}`) */
    //Usada id 1 para ejemplificar reviews, las id se pasaran por productCard

    fetch(`http://localhost:3100/reviews/${product.id}`)
      .then((data) => data.json())
      .then((allReviews) => setReviews(allReviews))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.reviewContainer}>
      <h3 className={styles.reviewTittle}>
        Mira las críticas de {product.name}{" "}
      </h3>
      {reviews.length > 0 ? (
        reviews.map((e) => (
          <div className={styles.reviewCard}>
              <Box component="fieldset" mb={3} borderColor="transparent" >
                <Typography component="legend">Valoracion: </Typography>
                <Rating name="read-only" value={e.value} readOnly />
              </Box>
            <p>{e.review}</p>
          </div>
        ))
      ) : (
        <h2>No se encontraron reviews para este producto.</h2>
      )}
    </div>
  );
}
