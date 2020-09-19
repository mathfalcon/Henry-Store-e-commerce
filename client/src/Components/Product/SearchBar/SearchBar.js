import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/navBar"
import styles from "../../../Styles/searchBar.module.css";
import logo from "../../../content/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logOutUser } from "../../../Redux/actions/authActions";


//Componente de busqueda de productos mediante una keyword


export default function SearchBar(props) {
  const [value, searchValue] = useState("");

  const userLogged = true;

  document.title = "Henry Store";
  const [logOut, setLogOut] = useState(false);

  const {loggedIn} = useSelector((state) => state.authUser);
  const {userLogged} = useSelector((state) => state.authUser);

  console.log(useSelector((state) => state.authUser))
  const dispatch = useDispatch();
  useEffect(() => dispatch(isLoggedIn()), [])

  const handleLogOut = () => {
    dispatch(logOutUser())
    window.location.href = '/';
  }
  return (
    <div className={styles.navBar}>
      <span className={styles.logoSpan}>
        <a href='/'><img src={logo} className={styles.logo} alt="Logo Henry" /></a>
      </span>
      <form className={styles.formSearchBar}
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSearch(value);
        }}>          
        <input
          className={styles.inputForm}
          placeholder="Busca un producto..."
          type="text"
          value={value}
          onChange={(e) => {
            searchValue(e.target.value);
          }}
        />
        <input className={styles.searchButton} type="submit" value="BUSCAR" />
      </form>
      <span>       
        {/*Private route*/}
        { userLogged.role === 'admin' &&
          <Link to="/product/admin" className="nav-item nav-link">Panel Admin</Link>
        }
      </span>
      {loggedIn && <Link to='/' onClick={handleLogOut} className="nav-item nav-link">Cerrar Sesión</Link>}
      {!loggedIn && <Link to="/sign-up" className="nav-item nav-link">Registrarse</Link>}
      {!loggedIn && <Link to="/login" className="nav-item nav-link">Iniciar Sesión</Link>}
      <Link to="/user/cart" className="nav-item nav-link">Carrito</Link>
      <div className={styles.menuNav}>
        <NavBar />
      </div>
    </div>
  );
}
