import React, { useState, useEffect } from "react";
import "./App.css";
/* import Catalogo from './Components/Catalogo/catalogo'; */
import AdminPanel from "./Components/AdminPanel/AdminPanel"
import CategoryForm from "./Components/CategoryForm/categoryForm";
import ProductForm from "./Components/Product/productForm";
import Product from "./Components/Product/product";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/landing";
import SearchBar from "./Components/Product/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import ProductUpdate from './Components/Product/productUpdate'
import CategoryUpdate from "./Components/CategoryForm/categoryUpdate";
import ProductCard from "./Components/ProductCard/productCard";

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
      .catch((err) => console.log(err));
  };

  return (
    <BrowserRouter>
      <Route
        path="/"
        render={() => <SearchBar handleSearch={handleSearch} />}
      />
      <Route
        path="/product/detailed/"
        render={() => <ProductCard />}
      />
      {products.length > 0 && <Redirect
          to={{
            pathname: "/product/search/",
            state: { products: products },
          }}
        /> }
      <Route
        exact
        path="/"
        render={() => <Landing />}
      />
      <Route
        path="/product/search"
        render={() => <SearchResults products={products}/>}
      />
      <Route
      exact
        path="/product/crud"
        render={() => <ProductForm />}
      />
      <Route
        path="/product/update"
        render={() => <ProductUpdate />}
      />
      <Route
      exact
        path="/product/admin"
        render={() => <AdminPanel />}
      />
      <Route
      exact
        path="/create-category"
        render={() => <CategoryForm />}
      />
      <Route
      exact
        path="/categories/update"
        render={() => <CategoryUpdate />}
      />
    </BrowserRouter>
  );
}

export default App;
//Borrar despues esta linea comentada