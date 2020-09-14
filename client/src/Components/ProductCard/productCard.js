import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../Styles/productDetail.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import henryShirt from "../../content/henryShirt.png";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    height: "50px",
    width: "auto",
  },
}));

const ProductCard = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(0);

  const classes = useStyles();
  useEffect(() => getProduct(), []);

  const getProduct = () => {
    fetch(`http://localhost:3100/products/${id}`)
      .then((data) => data.json())
      .then((product) => setProduct(product))
      .catch((err) => console.log(err));
  };

  const handleAddToCart = (e) => {
    axios({
      method: "post",
      url: "http://localhost:3100/users/1/cart", //cuando se cree el sistema de autentificacion el "1" deberia ser reemplazado por el id del usuario
      data: {
        idProducto: product.id,
        amount: 1,
      },
    })
  };

  return (
    <div className={styles.divCard}>
      <h2>{product.name}</h2>
      <div className={styles.divContent}>
        <div className={styles.divDescription}>
          <p>DESCRIPCIÓN:</p>
          <p>{product.description}</p>
          <p>PRECIO:</p>
          <p>${product.price}</p>
        </div>
        <div className={styles.imgBx}>
          <img src={henryShirt} alt="Henry Shirt" />
        </div>
        <div className={styles.divButtons}>
          <Button
            variant="contained"
            onClick={(e) => handleAddToCart(e)}
            href="http://localhost:3000/user/cart/"
            className={classes.button}
            startIcon={<AddShoppingCartIcon />}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
