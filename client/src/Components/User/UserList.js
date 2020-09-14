import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listUser } from '../../Redux/actions/userActions';
import styles from "../../Styles/ordersTable.module.css"

function OrdersTable() {

const { userList } = useSelector(state => state.userList);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(listUser());
}, []);

console.log('orderlist',userList);
  
return (
  <div className={styles.content}>

  <div>
    <h3>Listado de Usuarios</h3>
  </div>
  <div>

    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>          
        </tr>
      </thead>
      <tbody>
        {userList.map(user => (<tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>          
        </tr>))}
      </tbody>
    </table>

  </div>
</div>
  );
}
export default OrdersTable;