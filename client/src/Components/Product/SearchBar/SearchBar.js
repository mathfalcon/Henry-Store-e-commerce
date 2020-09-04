import React, {useState} from 'react';
import Product from '../Product/product';


//Componente de busqueda de productos mediante una keyword


export default function SearchBar(props) {
  const [value, searchValue] = useState('');
  const [products, setProducts] = useState([]); 
  const handleSearch = function (value){ //esta funcion deberia ser pasada como props, en el componente que genere todos los productos resultantes
    fetch(`http://localhost:3000/products/search/${value}`)
    .then(r => r.json())
    .then((data) => { // data = array que devuelve la db con los productos que hacen match
      console.log(data);
      setProducts(data);
    })
  };

  return (
    <div>
      <form onSubmit={(e) => {
      e.preventDefault();
      handleSearch(value);
      }}>
        <input placeholder = 'Busca un producto...' type="text" value={value} onChange={e => {searchValue(e.target.value)}}/>
        <input type='submit' value='BUSCAR'/> 
      </form>  
      {products.map((e,index) => <Product product= {e} key={index}/>)}
    </div>
  )
};