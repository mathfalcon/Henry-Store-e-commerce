import React from "react";
import styles from "../../Styles/categoryForm.module.css";
import axios from "axios";
import { useState } from "react";
//Formulario para crear categorias
function CategoryForm() {

  const [state, setState] = useState({
    name:"",
    description:""
  });
  const [error, setError] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  
  const { name, description } = state;
  const handleSubmit = (event) => {
    event.preventDefault();    

    if(name === "" || description === ""){
      setError(true);      
    return;
  }
  setError(false);

if( !error ){  
    axios({
      method: "post",
      url: "http://localhost:3100/categories/create-category",
      data: {
        name,
        description,
      }
    }).then(() => {
      alert('La categoría se ha creado con éxito')
      window.location.href = ("http://localhost:3000/product/admin");})
      .catch((err) => console.log(err));
      setState({name: "", description: ""});      
  };  
} 
    
  return (
      <div className={styles.containerCategoryForm}>
        <form className={styles.cardCategoryForm} onSubmit={handleSubmit}>
        <h3>Crear Categoria</h3>
        { error ? <p style={{ color: "red" }}>Todos los campos son obligatorios</p>     : null }
        <input
            key="name"
            type="text"
            placeholder="Nombre de la categoría"
            name="name"
            className={styles.inputCategory}
            value={name}
            onChange={handleChange}
        />
        <input
            key="description"
            type="text"
            placeholder="Descripción de la categoría"
            name="description"
            className={styles.inputCategory}
            value={description}
            onChange={handleChange}
        />
        <input key="submit" type="submit" className={styles.submitCategoryForm}/>
        </form>
      </div>
  );
}

export default CategoryForm;