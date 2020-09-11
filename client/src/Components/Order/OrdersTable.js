import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import styles from "../../Styles/ordersTable.module.css"

// la tabla esta mostrando un listado de productos para visualizarla
// habria que reemplazar la consulta en el action para que traiga las ordenes

function OrdersTable() {

const { orderList } = useSelector(state => state.orderList);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(listOrders());
}, []);

console.log('orderlist',orderList);
  
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
          <th>DATE</th>
          <th>TOTAL</th>
          <th>USER</th>
          <th>PAID</th>          
        </tr>
      </thead>
      <tbody>
        {orderList.map(order => (<tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.name}</td>
          <td>{order.price}</td>
          <td>{order.stock}</td>
          <td>{order.createdAt}</td>          
        </tr>))}
      </tbody>
    </table>

  </div>
</div>
  );
}
export default OrdersTable;