const initialState = {
    imgLanding:[],
    images: []
  };
  
  function imgReducer (state = initialState, action){    
    switch(action.type) {      
      case "GET_IMG":      
        return {
          ...state,
          imgLanding: state.imgLanding.concat(action.payload[0]),
          images: action.payload
        };
      default: 
        return state;
    }
  };
  
  export default imgReducer;