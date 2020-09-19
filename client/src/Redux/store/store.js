import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import orderListReducer from "../reducers/orderReducer";
import userListReducer from "../reducers/userReducer";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
import { loadState, saveState } from "../../Local-Storage/localStorage";
import {throttle} from 'lodash';

const reducer = combineReducers({
  orderList: orderListReducer,
  authUser: authReducer,
  userList: userListReducer,
});

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const persistedState = loadState()
const store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(() => {
  saveState({
    authUser: store.getState().authUser
  });
}, 200));

//composeEnhancer(applyMiddleware(thunk))

export default store;
