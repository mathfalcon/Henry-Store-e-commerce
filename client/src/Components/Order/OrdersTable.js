import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listOrders } from "../../Redux/actions/orderActions";
import OrderRow from "./OrderRow";
import styles from "../../Styles/ordersTable.module.css";

function OrdersTable() {
  
  const { orderList } = useSelector((state) => state.orderList); 
  
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(listOrders());     
  }, []);  

  // {orderList.map((order) => (dispatch(getTotal(order.id))))}  

  return (    
      <div className={styles.content}>
        <div>
          <h3>Listado de Ordenes</h3>
        </div>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>CREADA EL</th>
                <th>TOTAL</th>
                <th>USUARIO</th>
                <th>ESTADO</th>
                <th>PRODUCTOS</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, index) => {                        
                return (
                  <OrderRow order={order} key={index} />
                  // <tr key={order.id}> 
                  //   <td>{order.id}</td>
                  //   <td>{order.createdAt.split("T")[0]}</td>                                       
                  //   <td>$ {totalOrder}</td>
                  //   <td>{order.user.email}</td>
                  //   <td>{order.state}</td>
                  //   <td>VER PRODUCTOS</td>
                  // </tr>
                );
              })}
            </tbody>
          </table>          
        </div>        
      </div>
    );
  }

export default OrdersTable;