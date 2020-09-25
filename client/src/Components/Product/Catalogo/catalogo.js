import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImg } from "../../../Redux/actions/imgActions";
import Product from "../../Product/product.js";


export default function Catalogo({product}) {    
    const { images } = useSelector((state) => state.imgReducer); 
    const dispatch = useDispatch()
    
  useEffect(() => {     
      dispatch(getImg(product.id));
  }, []);  

return (
    <Fragment>
        <Product product={product} key={product.id} images={images}/>
    </Fragment>
  );
}