import React from "react";
import "./App.css";
/* import Catalogo from './Components/Catalogo/catalogo'; */
import CategoryForm from "./Components/Catalogo/categoryForm";
import ProductForm from "./Components/Product/productForm";
import Product from "./Components/Product/product";
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        {/* Eliminado render por defecto de React-create-app */}

        {/* Catalogo no se puede mostrar por que falta conexion con base de datos */}
        {/* <Catalogo/> */}

        {/* Creada ruta /products que muestra componente Catalogo con todos los productos */}
        {/* <Route path='/products' component={catalogo} />*/}

        {/* Creada ruta /products/:id que muestra componente producto de ese id, producto no esta conectada a base de datos */}
        <Route path='/products/:id' component={Product} exact/>

        {/* Añadido Componente Category Form con un h1 cabezera */}
        <h1>COMPONENTE: Category Form</h1>
        <CategoryForm />

        {/* Añadido Componente Product Form con un h1 cabezera */}
        <h1>COMPONENTE: Product Form</h1>
        <ProductForm />

        {/* Añadido Componente Product con un h1 cabezera */}
        <h1>COMPONENTE: Product</h1>
        {/* Un componente Product con valores de ejemplo pasados por sus props */}
        <Product
          name="Nombre del producto"
          description="descripcion del producto en particular "
          price={23}
          cantidad={2}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;
