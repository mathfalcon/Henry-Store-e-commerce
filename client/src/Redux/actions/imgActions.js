const getImg = (productId) => { 
    return function (dispatch){
      return fetch (`http://localhost:3100/images/${productId}`)
        .then ( response => response.json())
          .then(json => {          
            dispatch({ type: "GET_IMG", payload: json });
          });
      };
    }
    
    export { getImg };