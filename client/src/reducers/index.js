const initialState = {
    searchedProducts:[]
  };
  
  export default (state = initialState, action) => {    
    switch(action.type) {
  
      case 'SEARCH_PRODUCT':      
        return {
          ...state,
          searchedProducts: action.payload
        };
      default: 
        return state;
    }
  };