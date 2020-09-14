let userLogged = JSON.parse(localStorage.getItem('user'));
const initialState = userLogged ? { loggedIn: true, userLogged } : {};

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

export {
    getLoggedUserReducer,
}