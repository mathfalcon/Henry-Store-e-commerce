import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logoHenry from "../../Styles/Assets/logo henry black.png";
import styles from "../../Styles/signUp.module.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CreateIcon from '@material-ui/icons/Create';

function SignUp() {
  const [state, setState] = useState({ role: "client" });
    
  const { register, errors, getValues, handleSubmit } = useForm({ mode: "onBlur" });
  
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  function onSubmit(data){        
    console.log(data);        
    handleSend();
  }

  const handleSend = () => {      

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

  const handleSelected = () => {    
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

      <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre</label>
          <input
            name="name"
            onChange={handleChange}
            value={state.name}
            ref={register({ required: true })}
            />
              {errors.name && (
               <span style={{ color: "red" }}>* El nombre es requerido</span>
              )}

          <label>Nombre de usuario</label>
          <input
            name="username"
            onChange={handleChange}
            value={state.username}
            ref={register({ required: true })}
          />
            {errors.username && (
              <span style={{ color: "red" }}>* El username es requerida</span>
            )}

          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            value={state.email}
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,                
                }
              })}
            />
              {errors.email && (
                <span style={{ color: "red" }}>* Verifique el email ingresado</span>
              )}

          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={state.password}
            ref={register({ required: true })}          
          />
             {errors.password && (
              <span style={{ color: "red" }}>* La contraseña es requerida</span>
             )}

          <label>Confirmar contraseña</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={state.confirmPassword}
            ref={register({
              required: "* Confirme la contraseña",
              validate: {
                matchesPreviousPassword: value => {
                  const { password } = getValues();
                  return password === value || "* Las contraseña debe coincidir";
                }
              }
            })}
          />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>
                {errors.confirmPassword.message}
              </p>
            )}

          <div className={styles.button}>              
            <Button
              type="submit"    
              variant="contained"
              color="secondary"
              // onClick={handleSend}
              style={{ backgroundColor: "#ffff5a", color: "black" }}
              endIcon={<CreateIcon />}
            >
              REGISTRARSE
            </Button>

            <label style={{marginLeft: '15px'}}>
              o <a href="http://localhost:3000/login">Inicia sesión</a>
            </label>
          </div>
        </form>

      </div>
    </div>
  );
}

export default SignUp;