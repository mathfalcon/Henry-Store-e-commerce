import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../Styles/loginForm.module.css";
import logoHenry from "../../Styles/Assets/logo henry black.png";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';

import { loginUser, logoutUser } from "../../Redux/actions/userActions";

function LoginForm() {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    console.log(state);
  };

// const userLogged = useSelector(state => state.userLogged);
const dispatch = useDispatch();

// reset login status
useEffect(() => {
    dispatch(logoutUser()); 
}, []);

function handleSubmit(e) {
    e.preventDefault();
    
    if (username && password) {        
        dispatch(loginUser(username, password));
    }
}

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <label>
            <b>Inicia Sesión</b>
          </label>
        </div>
        <p>Lorem Ipsum is simply Ipsummy text en bt also the leap into electronic typesetting...</p>
        <img src={logoHenry} alt="logoHenry" className={styles.imgLogo} />
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input
            name="username"
            onChange={handleChange}
          />
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
          />
          <div className={styles.button}>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#ffff5a", color: "black" }}
              endIcon={<CreateIcon />}
            >
              INICIAR SESION
            </Button>
            <label style={{marginLeft: '15px'}}>
              o <a href="http://localhost:3000/sign-up">Regístrate</a>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
