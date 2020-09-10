export function searchProduct(value) {  
    return function(dispatch) {
      return fetch(`http://localhost:3000/products/search/${value}`)
        .then(response => response.json())
          .then(json => {
          dispatch({ type: "SEARCH_PRODUCT", payload: json });
        });
   };
}