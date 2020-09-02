import React from 'react';

//Formulario para crear categorias
function CategoryForm () {
    //Falta agregar funcion onSubmit
    return (
        <form>
            <input key='name' type='text' placeholder='Nombre de la categoría' name='name'/>
            <input key='description' type='text' placeholder='Descripción de la categoría' name='description'/>
            <input key='submit' type='submit'/>
        </form>
    );
}

export default CategoryForm;