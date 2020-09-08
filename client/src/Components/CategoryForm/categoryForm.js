import React from "react";
import styles from "../../Styles/categoryForm.module.css";
//Formulario para crear categorias
function CategoryForm() {
  //Falta agregar funcion onSubmit
  return (
      <div className={styles.containerCategoryForm}>
        <form className={styles.cardCategoryForm}>
        <h3>Crear Categoria</h3>
        <input
            key="name"
            type="text"
            placeholder="Nombre de la categoría"
            name="name"
            className={styles.inputCategory}
        />
        <input
            key="description"
            type="text"
            placeholder="Descripción de la categoría"
            name="description"
            className={styles.inputCategory}
        />
        <input key="submit" type="submit"  className={styles.submitCategoryForm}/>
        </form>
      </div>

  );
}

export default CategoryForm;
