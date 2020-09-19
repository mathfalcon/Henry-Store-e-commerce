const listOrders = () => {  
    return function(dispatch) {
      // return fetch(`http://localhost:3100/orders`)
      return fetch(`http://localhost:3100/orders/`)
        .then(response => response.json())
          .then(json => {
          dispatch({ type: "ORDER_LIST", payload: json });
        });
   };
}

export default listOrders;