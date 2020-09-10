import React, { useState } from "react";
import Product from "../product";
import styles from "../../../Styles/searchBar.module.css";
import logo from "../../../content/logo.png";
import { connect, useDispatch } from 'react-redux';
import { searchProduct } from '../../../actions/index.js'
//Componente de busqueda de productos mediante una keyword

export function SearchBar(props) {
  const [value, searchValue] = useState("");
  const [searchedProducts, setSearched] = useState([]); 
    
  const dispatch = useDispatch();

  const handleSearch = (e) => {    
   e.preventDefault();
   dispatch(searchProduct(value));
  }
  
  
  return (
    <div className={styles.navBar}>
      <span className={styles.logoSpan}>
        <a href='/'><img src={logo} className={styles.logo} alt="Logo Henry" /></a>
      </span>
      <form className={styles.formSearchBar} onSubmit={handleSearch} >
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
        <a href="#">Registrarse</a>
      </span>
      <span>
        <a href="#">Ingresar</a>
      </span>
      <span className={styles.cartSpan}>
        <a href="#">Carrito</a>
      </span>
    </div>
  );
}

const mapStateToProps = state => {  
  return {
    searchedProducts: state.searchedProducts
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    searchProduct: (value) => dispatch(searchProduct(value)),    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
