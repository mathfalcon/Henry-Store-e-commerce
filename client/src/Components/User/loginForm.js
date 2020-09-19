import React, { useState, useEffect } from "react";
import styles from "../../Styles/loginForm.module.css";
import logoHenry from "../../Styles/Assets/logo henry black.png";
import axios from "axios";
import Button from "@material-ui/core/Button";

function LoginForm() {
  const [state, setState] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    axios({
      method: "post",
      url: "http://localhost:3100/auth/login",
      data: {
        email: state.username,
        password: state.password,
      },
      withCredentials: true,
    }).then((data) => {
      if (data.data.success) {
        window.location.href = "http://localhost:3000/user/cart";
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <label>
            <b>INICIAR SESIÓN</b>
          </label>
        </div>
        <p>
          Lorem Ipsum is simply Ipsummy text en bt also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recentl
        </p>
        <img src={logoHenry} alt="logoHenry" className={styles.imgLogo} />
      </div>
      <div className={styles.form}>
        <form>
          <label>Email</label>
          <input name="username" onChange={handleChange} />
          <label>Contraseña</label>
          <input name="password" type="password" onChange={handleChange} />
          <div className={styles.button}>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#ffff5a", color: "black" }}
              onClick={handleSubmit}
            >
              INICIAR SESION
            </Button>
            <label style={{ marginLeft: "15px" }}>
              o <a href="http://localhost:3000/sign-up">Regístrate</a>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
