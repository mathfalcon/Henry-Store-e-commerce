import React, { useState, useEffect } from "react";
import "./App.css";
/* import Catalogo from './Components/Catalogo/catalogo'; */
import AdminPanel from "./Components/AdminPanel/AdminPanel"
import CategoryForm from "./Components/CategoryForm/categoryForm";
import ProductForm from "./Components/Product/productForm";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/landing";
import SearchBar from "./Components/Product/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import OrdersTable from "./Components/Order/OrdersTable";
import Cart from '../src/Components/Cart/cart';
import LoginForm from '../src/Components/User/loginForm';
import ProductCard from "./Components/ProductCard/productCard";
import ProductUpdate from './Components/Product/productUpdate'
import CategoryUpdate from "./Components/CategoryForm/categoryUpdate";
import SignUp from "../src/Components/User/signUp";
import UserList from "../src/Components/User/UserList";
import {PrivateRoute} from './Components/PrivateRoute/PrivateRoute';


function App() {
  const [products, setProducts] = useState([]);
  const handleSearch = function (value) {
    //esta funcion deberia ser pasada como props, en el componente que genere todos los productos resultantes
    fetch(`http://localhost:3100/products/search/${value}`)
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
      <Route
      exact
        path="/product/crud"
        render={() => <ProductForm />}
      />
      <PrivateRoute
      exact
        path="/product/admin"
        roles='admin'
        component={AdminPanel}
      />
      <Route
      exact
        path="/create-category"
        render={() => <CategoryForm />}
      />
      <Route
      exact
        path="/show-table"
        render={() => <OrdersTable />}
      />
      <Route
      exact
        path="/user/cart"
        render={() => <Cart />}
      />
      <Route
      exact
        path="/user"
        render={() => <LoginForm />}
      />
      <Route
        path="/product/detailed/:id"
        render={() => <ProductCard />}
      />
      <Route
        path="/product/update"
        render={() => <ProductUpdate />}
      />
      <Route
      exact
        path="/categories/update"
        render={() => <CategoryUpdate />}
      />
      <Route
        exact
        path="/sign-up"
        render={() => <SignUp />}
      />
      <Route
      exact
        path="/list-users"
        render={() => <UserList />}
      />
    </BrowserRouter>
  );
}

export default App;
//Borrar despues esta linea comentada