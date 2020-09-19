let userLogged = JSON.parse(localStorage.getItem('user'));
const initialState = userLogged ? { loggedIn: true, userLogged } : {};

const initialState = {
    userList:[],    
  };

function getLoggedUser(state = initialState, action) {
    switch (action.type) {
        case 'GET_LOGGED_USER':
            return {                
                userLogged
            };
        default:
            return state
    }
}

function loginUser (state = initialState, action){
    
    // switch(action.type) {
    
    //     case "LOGIN_USER":      
    //     return {
            loggedIn = true;
            localStorage.setItem('user', JSON.stringify(user));
    //     };
    // }
}

function logoutUser (state = initialState, action){
    // switch(action.type) {    
    //     case "LOGOUT_USER":
            // return {   
            localStorage.removeItem('user');
            // }      
    // }
}

function userList (state = initialState, action){    
    switch(action.type) {
    
        case 'USER_LIST':      
        return {
            ...state,
            userList: action.payload
        };
        default: 
        return state;
    }
};

export {
    getLoggedUser,
    userList,
    loginUser,
    logoutUser
}