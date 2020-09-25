const initialState = {
    images:[],   
  };
  
  function imgReducer (state = initialState, action){    
    switch(action.type) {      
      case "GET_IMG":      
        return {
          ...state,
          images: state.images.concat(action.payload[0])
        };
      default: 
        return state;
    }
  };
  
  export default imgReducer;