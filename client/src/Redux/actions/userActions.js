const listUser = () => {  
    return function(dispatch) {      
      return fetch(`http://localhost:3100/users/`)
        .then(response => response.json())
          .then(json => {
          dispatch({ type: "USER_LIST", payload: json });
        });
   };
}

const loginUser = ( username, password ) => {
  const body = JSON.stringify({ username, password })
  return function(dispatch) {      
    return fetch(`http://localhost:3100/users/login`, body )
      .then(response => response.json())
        .then(json => {
        dispatch({ type: "LOGIN_USER", payload: json });
      });
 };
}

const logoutUser = () => {
  dispatch({ type: "LOGOUT_USER" });  
}

export { listUser, loginUser, logoutUser };

// const userLogged = (idUser) => {  
//   return function(dispatch) {      
//     return fetch(`http://localhost:3100/users/${idUser}`)
//       .then(response => response.json())
//         .then(json => {
//         dispatch({ type: "GET_LOGGED_USER", payload: json });
//       });
//  };
// }