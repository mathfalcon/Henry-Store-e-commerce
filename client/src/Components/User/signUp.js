import React, { useState, useEffect } from "react";
import logoHenry from "../../Styles/Assets/logo henry black.png";
import styles from "../../Styles/signUp.module.css";
import axios from "axios";

function SignUp() {

    const [state, setState] = useState({});

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({ ...state, [name]: value });
        console.log(state);
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
              role: "client",
            },
        }).then(() => {
            alert('El usuario se ha creado con éxito')
        })
          .catch((err) => console.log(err));
          setState({ ...state, name: "", username: "", email: "", password: "", confirmPassword: ""});
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div>
                    <label><b>Regístrate</b></label>
                    <h2>Selecciona tu Rol</h2>
                    <select>
                        <option>Cliente</option>
                        <option>Administrador</option>
                    </select>
                    <p>Como <b>Cliente</b> podrás comprar productos, y como <b>Administrador</b> tendrás la posibilidad de vender productos para que otras personas los compren.</p>
                </div>
                <img src={logoHenry} alt="logoHenry" className={styles.imgLogo}/>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input name="name" onChange={handleChange} value={state.name}/>
                    <label>Nombre de usuario</label>
                    <input name="username" onChange={handleChange} value={state.username}/>
                    <label>Email</label>
                    <input name="email" onChange={handleChange} value={state.email}/>
                    <label>Contraseña</label>
                    <input name="password" type="password" onChange={handleChange} value={state.password}/>
                    <label>Confirmar contraseña</label>
                    <input name="confirm-password" type="password" onChange={handleChange} value={state.confirmPassword}/>
                    <div className={styles.button}>
                        <input name="sign-up" type="submit"/>
                        <label>o <a>Inicia sesión</a></label>
                    </div>
                </form>
            </div>
        </div>
        );
    }
    
export default SignUp;