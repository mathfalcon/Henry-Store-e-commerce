const initialState = {
    orderList:[]
  };
  
  function orderListReducer (state = initialState, action){    
    switch(action.type) {
  
      case 'ORDER_LIST':      
        return {
          ...state,
          orderList: action.payload
        };
      default: 
        return state;
    }
  };

export {
    orderListReducer,
}