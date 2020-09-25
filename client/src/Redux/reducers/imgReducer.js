const initialState = {
    images:[],   
  };
  
  function imgReducer (state = initialState, action){    
    switch(action.type) {      
      case "GET_IMG":      
        return {
          ...state,
          images: action.payload
        };
      default: 
        return state;
    }
  };
  
  export default imgReducer;