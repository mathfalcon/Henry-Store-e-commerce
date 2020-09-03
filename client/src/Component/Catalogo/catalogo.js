import React, { Component } from "react";
import { connect } from 'react-redux';
// import ProductCard from "../Product/productCard";

class Catalogo extends Component {

    handleFiltro( products, id_categoria ){

// un producto puede tener varias categorias -> ver como recorrerlas para filtrar
// Product.belongsToMany(Categories, { through: 'categoryId'});
// Categories.belongsToMany(Product, { through: 'productId'});

        if ( id_categoria ){
            return products.filter( p => ( p.categories.includes(id_categoria) &&  p.stock > 0 ));
        } else {
            return products;
        }
    }

    render() {
        const { products, id_categoria } = this.props;
        const showProducts = this.handleFiltro( products, id_categoria );
        
        return (
            <div>
                <h1>Productos</h1> 
                { showProducts.map( product => {
                    return (
                        // si no hay stock del producto no mostrar la card
                        // tambien debo mandar la funcion para agregar al carrito a la productCard
                        <ProductCard
                            key={ product.id }
                            { ...product }
                        />
                        )
                    })               
                }               
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      products: state.products,
      //id_categoria: state.id_categoria ??
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);