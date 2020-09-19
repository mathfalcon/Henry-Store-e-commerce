import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import listUser from "../../Redux/actions/userActions";
import styles from "../../Styles/ordersTable.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axios = require("axios");

function OrdersTable() {
  const { userList } = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [idUser, setUser] = useState(undefined);
  const [openSnack, setSnack] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setUser(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpen(false);
    handleDelete(idUser);
  };

  const handleSnack = () => {
    setSnack(false);
  };

  useEffect(() => {
    dispatch(listUser());
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3100/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        dispatch(listUser());
        setSnack(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
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
                <th style={{ textAlign: "center" }}>MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      className={styles.buttonDelete}
                      onClick={() => handleClickOpen(user.id)}
                    >
                      BORRAR
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres borrar el usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", paddingBottom: "5px" }}
          >
            Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{
              maxWidth: "25%",
              color: "white",
              backgroundColor: "black",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCloseDelete}
            color="primary"
            autoFocus
            style={{
              maxWidth: "25%",
              color: "black",
              backgroundColor: "#ffff01",
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity="success" style={{backgroundColor: '#ffff5a', color: 'black'}}>
          El usuario fue borrado con exito
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
export default OrdersTable;
