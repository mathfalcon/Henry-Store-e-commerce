import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { orderList } from '../reducers/orderReducer'
import {
    getLoggedUser,   
    loginUser,
    logoutUser,
    userList
    } from '../reducers/userReducer';
import thunk from "redux-thunk";

const reducer = combineReducers({
    orderList,
    getLoggedUser,
    userList,
    loginUser,
    logoutUser
});

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
//composeEnhancer(applyMiddleware(thunk))

export default store;