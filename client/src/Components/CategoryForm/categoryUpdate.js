import React from "react";
import styles from "../../Styles/categoryForm.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
//Formulario para crear categorias
function CategoryUpdate() {
  const [state, setState] = useState({});
  const [toUpdate, setUpdate] = useState({});


  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = state;
    if (!state.name) body.name = toUpdate.name;
    if (!state.description) body.description = toUpdate.description;
    axios({
      method: "put",
      url: `http://localhost:3100/categories/${toUpdate.id}/update`,
      data: body,
    })
      .then(() => {
        alert(`La categoria ${body.name} se actualizó con éxito.`);
        window.location.href = ("http://localhost:3000/product/admin/category-table")
      })
      .catch((err) => console.log(err));
    setState({ name: "", description: "" });
  };

  const id = window.location.search.split("=").pop();

  useEffect(() => {
    fetch(`http://localhost:3100/categories/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setUpdate(data);
      });
  }, []);

  return (
    <div className={styles.containerCategoryForm}>
      <form className={styles.cardCategoryForm} onSubmit={handleSubmit}>
        <h3>Actualizar Categoria</h3>
        <input
          key="name"
          type="text"
          placeholder={toUpdate.name}
          name="name"
          className={styles.inputCategory}
          value={state.name}
          onChange={handleChange}
        />
        <input
          key="description"
          type="text"
          placeholder={toUpdate.description}
          name="description"
          className={styles.inputCategory}
          value={state.description}
          onChange={handleChange}
        />
        <input
          key="submit"
          type="submit"
          className={styles.submitCategoryForm}
        />
      </form>
    </div>
  );
}

export default CategoryUpdate;