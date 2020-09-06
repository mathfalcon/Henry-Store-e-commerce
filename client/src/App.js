import React, { useState } from "react";
import "./App.css";
/* import Catalogo from './Components/Catalogo/catalogo'; */
import CategoryForm from "./Components/CategoryForm/categoryForm";
import ProductForm from "./Components/Product/productForm";
import Product from "./Components/Product/product";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Components/Landing/landing";
import SearchBar from "./Components/Product/SearchBar/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const handleSearch = function (value) {
    //esta funcion deberia ser pasada como props, en el componente que genere todos los productos resultantes
    fetch(`http://localhost:3000/products/search/${value}`)
      .then((r) => r.json())
      .then((data) => {
        // data = array que devuelve la db con los productos que hacen match
        setProducts(data);
      })
      .catch((err) => alert("Debes ingresar un texto válido"));
  };
  return (
    <ProductForm />
    // <BrowserRouter>
    //   <Route
    //     path="/"
    //     render={() => <SearchBar handleSearch={handleSearch} />}
    //   />
    //   <Route
    //     exact
    //     path="/"
    //     render={() => <Landing handleSearch={handleSearch} />}
    //   />
    // </BrowserRouter>
  );
}

export default App;
