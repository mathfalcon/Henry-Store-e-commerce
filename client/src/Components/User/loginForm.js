import React, { useState, useEffect } from "react";
import styles from "../../Styles/loginForm.module.css";

function LoginForm() {
    
//   const signUpButton = document.getElementById("signUp");
//   const signInButton = document.getElementById("signIn");
//   const container = document.getElementById("container");

//   signUpButton.addEventListener("click", () => {
//     container.classList.add("right-panel-active");
//   });

//   signInButton.addEventListener("click", () => {
//     container.classList.remove("right-panel-active");
//   });

  return (
    <div className={styles.containerDiv}>
      <div className={styles.container} id="container">
        <div
          className={styles.formContainer}
          className={styles.signUpContainer}
        >
          <form className={styles.formLogin} action="#">
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="Name"
            />
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="Email"
            />
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Password"
            />
            <button className={styles.buttonLogin}>Sign Up</button>
          </form>
        </div>
        <div
          className={styles.formContainer}
          className={styles.signInContainer}
        >
          <form action="#">
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="Email"
            />
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Password"
            />

            <button className={styles.buttonLogin}>Sign In</button>

            <a href="#">Forgot your password?</a>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={styles.overlayPanel} className={styles.overlayLeft}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className={styles.buttonGhost} id="signIn">
                Sign In
              </button>
            </div>
            <div
              className={styles.overlayPanel}
              className={styles.overlayRight}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
