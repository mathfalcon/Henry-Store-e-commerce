import React, { useState, useEffect } from "react";
import "./App.css";
/* import Catalogo from './Components/Catalogo/catalogo'; */
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/landing";
import SearchBar from "./Components/Product/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";

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
    </BrowserRouter>
  );
}

export default App;
