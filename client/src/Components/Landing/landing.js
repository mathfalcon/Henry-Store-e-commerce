import React, { useState } from "react";
import styles from "../../Styles/landing.module.css";
import logoText from "../../content/logoComplete.png";

export default function Landing(props) {
  return (
      <section>
        <section className={styles.sectionLanding}>
          <span style={{color: 'white'}}>BIENVENIDO A</span>
          <span className={styles.henryLogo}>
            <img src={logoText}/>
            <p style={{color: '#FFFF01'}}>STORE</p>
          </span>
        </section>
      </section>
  );
}
