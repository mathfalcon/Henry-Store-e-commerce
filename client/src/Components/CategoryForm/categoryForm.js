import React from "react";
import styles from "../../Styles/categoryForm.module.css";
import axios from "axios";
import { useState } from "react";
//Formulario para crear categorias
function CategoryForm() {

  const [state, setState] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3100/products/create-category",
      data: {
        name: state.name,
        description: state.description,
      }
    }).then(alert('La categoria se ha creado con éxito'))
      .catch((err) => console.log(err));
      setState({name: "", description: ""});
  };
    
  return (
      <div className={styles.containerCategoryForm}>
        <form className={styles.cardCategoryForm} onSubmit={handleSubmit}>
        <h3>Crear Categoria</h3>
        <input
            key="name"
            type="text"
            placeholder="Nombre de la categoría"
            name="name"
            className={styles.inputCategory}
            value={state.name}
            onChange={handleChange}
        />
        <input
            key="description"
            type="text"
            placeholder="Descripción de la categoría"
            name="description"
            className={styles.inputCategory}
            value={state.description}
            onChange={handleChange}
        />
        <input key="submit" type="submit" className={styles.submitCategoryForm}/>
        </form>
      </div>
  );
}

export default CategoryForm;
