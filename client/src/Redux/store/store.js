import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { orderListReducer } from '../reducers/orderReducer'
import { getLoggedUserReducer } from '../reducers/userReducer';
import thunk from "redux-thunk";

const reducer = combineReducers({
    orderList: orderListReducer,
    getLoggedUser: getLoggedUserReducer,
});

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
//composeEnhancer(applyMiddleware(thunk))

export default store;