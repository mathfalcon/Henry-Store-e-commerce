import React, { useState, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import styles from "../../Styles/productForm.module.css";
import logoText from "../../Styles/Assets/logo henry black.png";
import axios from "axios";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '500px',
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    backgroundColor:
      personName.indexOf(name) === -1
        ? 'white'
        : '#dddd37',
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProductForm() {
  /* Categorias de ejemplo */
  const data = [
    { Category: "Category1", id: 1 },
    { Category: "Category2", id: 2 },
    { Category: "Category3", id: 3 },
    { Category: "Category4", id: 4 },
  ];
  const [options] = useState(data);
  const classes = useStyles();
  const theme = useTheme();
  /* Estados */
  const [state, setState] = useState({});
  const [categories, setCategories] = useState([]);
  const [personName, setPersonName] = useState([])

  /* Peticion GET a categories */
  useEffect(() => {
    fetch("http://localhost:3100/categories")
      .then((data) => data.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios({
      method: "post",
      url: "http://localhost:3100/products/create-product",
      data: {
        name: state.name,
        description: state.description,
        price: state.price,
        stock: state.stock,
      },
    }).then((data) => {if(personName.length > 0){
      personName.forEach((e) => {
        axios({
        method: "post",
        url: `http://localhost:3100/products/${data.data.id}/addCategory/${e}`,
      })})
      }
    }).then(() => {
      alert('El producto se ha creado con éxito')
      window.location.href = ("http://localhost:3000/product/admin");})
    .catch((err) => console.log(err));
    setState({ ...state, name: "", description: "", price: "", stock: "" });
  };

  const handleChanges = (event) => {
    setPersonName(event.target.value);
  };


  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <div className={styles.name}>

            <label>Nombre</label>
            <br />
            <input name="name" onChange={handleChange} value={state.name} />
            <br />
          </div>
          <div className={styles.description}>
            <label>Descripción</label>
            <br />
            <textarea
              name="description"
              onChange={handleChange}
              value={state.description}
            />
            <br />
          </div>
          <div className={styles.priceStock}>
            <label>Precio</label>
            <br />
            <input
              type="number"
              name="price"
              min="0.00"
              step="0.01"
              onChange={handleChange}
              value={state.price}
            />
            <label>Stock</label>
            <br />
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              onChange={handleChange}
              value={state.stock}
            />
          </div>
          <div>
            <label>Subir Imágenes</label>
            <input type="file" name="dropimage" accept="image/*" />
          </div>
          <div>
            <input
              type="submit"
              className={styles.SubmitButton}
              value="Enviar"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <h3>Crear Producto</h3>
          {/* Selector multiple de categorias */}
          <div className={styles.Multiselect}>
            <h2>Seleccionar Categorias: </h2>
              {categories.length > 0 &&
                <FormControl style={{width: '80%'}}>
                <InputLabel id="demo-mutiple-name-label" >Categorías</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={personName}
                  onChange={handleChanges}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {categories.map((name,index) => (
                    <MenuItem key={index} value={name.id} style={getStyles(name.id, personName, theme)}>
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>}
          </div>
          <img className={styles.imgLogo} src={logoText} alt="logoHenry" />
        </div>
      </form>
    </div>
  );
}
export default ProductForm;
