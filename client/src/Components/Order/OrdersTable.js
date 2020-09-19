import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import listOrders from "../../Redux/actions/orderActions";
import styles from "../../Styles/ordersTable.module.css";
import axios from 'axios'

// la tabla esta mostrando un listado de productos para visualizarla
// habria que reemplazar la consulta en el action para que traiga las ordenes

function OrdersTable() {
  const [users, setUsers] = useState([]);

  const { orderList } = useSelector((state) => state.orderList);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://localhost:3100/users")
      .then((data) => data.json())
      .then((data) => setUsers(data));
  };
  const getTotal = (orderId) => {
    axios
      .get(`http://localhost:3100/orders/products/${orderId}`) //Looks for the information of the active order
      .then((data) => {
        console.log(data)
        let total = 0;
        data.data[0].products.forEach(
          (e) => (total += e.price * e.amount.amount)
        );
        console.log(total)
        return total;
      });
  };

  // console.log("orderlist", orderList);

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
            {orderList.map((order) => {
              var total = getTotal(order.id)
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt.split("T")[0]}</td>
                  <td>$ {total} </td>
                  <td>{order.user.email}</td>
                  <td>{order.state}</td>
                  <td>VER PRODUCTOS</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdersTable;
