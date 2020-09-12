import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store/store'
//Cuando se implemente redux hay que agregar reemplazar esto por esto
// ReactDOM.render(
//   <Provider>
//   <BrowserRouter>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>    
      <App />    
  </Provider>,
  document.getElementById('root')
);
