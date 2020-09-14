// let userLogged = JSON.parse(localStorage.getItem('user'));
// const initialState = userLogged ? { loggedIn: true, userLogged } : {};

const initialState = {
    userList:[]
  };

function getLoggedUserReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_LOGGED_USER':
            return {
                loggingIn: true,
                userLogged: action.user
            };
        default:
            return state
        }
    }

function userListReducer (state = initialState, action){    
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
    getLoggedUserReducer,
    userListReducer
}