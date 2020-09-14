import React, { useState, useEffect } from "react";
import logoHenry from "../../Styles/Assets/logo henry black.png";
import styles from "../../Styles/signUp.module.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';


function SignUp() {
  const [state, setState] = useState({ role: "client" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:3100/users/create",
      data: {
        name: state.name,
        username: state.username,
        email: state.email,
        role: state.role,
      },
    })
      .then(() => {
        alert("El usuario se ha creado con éxito");
      })
      .catch((err) => console.log(err));
    setState({
      ...state,
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSelected = (event) => {
    event.preventDefault();
    var selected = document.getElementById("select").value;
    state.role = selected;
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <label>
            <b>Regístrate</b>
          </label>
          <h2>Selecciona tu Rol</h2>
          <select id="select" onChange={handleSelected}>
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <p>
            Como <b>Cliente</b> podrás comprar productos, y como{" "}
            <b>Administrador</b> tendrás la posibilidad de vender productos para
            que otras personas los compren.
          </p>
        </div>
        <img src={logoHenry} alt="logoHenry" className={styles.imgLogo} />
      </div>
      <div className={styles.form}>
        <form>
          <label>Nombre</label>
          <input name="name" onChange={handleChange} value={state.name} />
          <label>Nombre de usuario</label>
          <input
            name="username"
            onChange={handleChange}
            value={state.username}
          />
          <label>Email</label>
          <input name="email" onChange={handleChange} value={state.email} />
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={state.password}
          />
          <label>Confirmar contraseña</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={state.confirmPassword}
          />
          <div className={styles.button}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              style={{ backgroundColor: "#ffff5a", color: "black" }}
              endIcon={<CreateIcon />}
            >
              REGISTRARSE
            </Button>
            <label style={{marginLeft: '15px'}}>
              o <a>Inicia sesión</a>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
