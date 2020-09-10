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
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [products, setProducts] = useState([]);
  // const handleSearch = function (value) {
  //   //esta funcion deberia ser pasada como props, en el componente que genere todos los productos resultantes
  //   fetch(`http://localhost:3000/products/search/${value}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       // data = array que devuelve la db con los productos que hacen match
  //       setProducts(data);     
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Route
        path="/"
        render={() => <SearchBar />} //handleSearch={handleSearch}
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
      exact
        path="/product/admin"
        render={() => <AdminPanel />}
      />
      <Route
      exact
        path="/create-category"
        render={() => <CategoryForm />}
      />
    </BrowserRouter>
    </Provider>
  );
}

export default App;