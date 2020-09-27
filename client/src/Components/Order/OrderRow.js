import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../Redux/actions/orderActions";
import styles from "../../Styles/ordersTable.module.css";
import OrderState from './OrderState'

function OrderRow({order: {id, createdAt, user, state}}) {
  
  const { totalOrder } = useSelector((state) => state.totalOrder);

  const dispatch = useDispatch()

  useEffect(() => {        
    dispatch(getTotal(id))  
  }, []);
  
    return (
        <tr> 
        <td>{id}</td>
        <td>{createdAt.split("T")[0]}</td>                                       
        <td>$ {totalOrder[(id - 1)]}</td>
        <td>{user.email}</td>
        <td>{state}</td>
        <td><OrderState orderId={id}/></td>
        </tr>        
    );            
  }

export default OrderRow;