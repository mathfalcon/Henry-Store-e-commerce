import React from 'react';
import './App.css';
//import Catalogo from './Components/Catalogo/catalogo';
import CategoryForm from './Components/Product/categoryForm';
import ProductForm from './Components/Product/productForm';
import Product from './Components/Product/product';
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Eliminado render por defecto de React-create-app */}

        {/* Catalogo no se puede mostrar por que falta componente ProductCard */}
        {/* <Catalogo/>  */}

        {/* Añadido Componente Category Form con un h1 cabezera */}
        <h1>COMPONENTE: Category Form</h1>
        <CategoryForm/>

        {/* Añadido Componente Product Form con un h1 cabezera */}
        <h1>COMPONENTE: Product Form</h1>
        <ProductForm/>

        {/* Añadido Componente Product con un h1 cabezera */}
        <h1>COMPONENTE: Product</h1>
        {/* Un componente Product con valores de ejemplo pasados por sus props */}
        <Product name="Nombre del producto" description="descripcion del producto en particular " price={23} cantidad={2}/>
        
        {/* Creada Ruta /products/:id que muestra el componente Product, este debe tener un id, por lo que hay que cambiarlo */}
        <Route path='/products/:id' component={Product}/>
        
      </div>
      </BrowserRouter>

  );
}

export default App;
