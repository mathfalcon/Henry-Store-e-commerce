import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../Styles/productDetail.module.css";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import henryShirt from "../../content/henryShirt.png";
import axios from "axios";
import Review from "../Review/Review";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../../Redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#ffff5a",
    height: "50px",
    width: "auto",
  },
}));

const ProductCard = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});

  const classes = useStyles();
  //Asignando el hook de dispatch a una constante
  const dispatch = useDispatch();

  //Se asigna el valor de userLogged por destructuring
  const userLogged = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(isLoggedIn());
    getProduct();
  }, []);

  const getProduct = () => {
    fetch(`http://localhost:3100/products/${id}`)
      .then((data) => data.json())
      .then((product) => setProduct(product))
      .catch((err) => console.log(err));
  };

  console.log(userLogged)

  const handleAddToCart = () => {
    if (userLogged.loggedIn) {
      axios({
        method: "post",
        url: `http://localhost:3100/users/${userLogged.id}/cart`, //cuando se cree el sistema de autentificacion el "1" deberia ser reemplazado por el id del usuario
        data: {
          idProducto: product.id,
          amount: 1,
        },
      });
    } else {
      console.log('holaa')
      var storage = JSON.parse(localStorage.getItem("guestCart"));
      if (storage == null) {
        storage = [];
      }

      var data = { productId: product.id, amount: 1 };
      storage.push(data);

      localStorage.setItem("guestCart", JSON.stringify(storage));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.divCard}>
        <div className={styles.mainInfo}>
          <div className={styles.imgBx}>
            <img src={henryShirt} alt="Henry Shirt" />
          </div>
          <div className={styles.divButtons}>
            <span>
              <p>{product.name}</p>
            </span>
            <p>${product.price}</p>
            <div className={styles.chipDiv}>
              {product.categories &&
                product.categories.map((e) => (
                  <Chip
                    variant="outlined"
                    color="primary"
                    label={e.name}
                    className={styles.chip}
                    title={e.description}
                  />
                ))}
            </div>
            <Button
              variant="contained"
              style={{ width: "80%", marginTop: "10px" }}
              onClick={handleAddToCart}
              // href="http://localhost:3000/user/cart/"
              className={classes.button}
              startIcon={<AddShoppingCartIcon />}
            >
              Comprar
            </Button>
          </div>
        </div>
        <div className={styles.divContent}>
          <div className={styles.divDescription}>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={styles.reviewsDiv}>
          <Review product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
