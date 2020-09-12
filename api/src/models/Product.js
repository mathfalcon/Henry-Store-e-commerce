const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  sequelize.define('images', {
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    }
 });
  sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  sequelize.define('ordersLines', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type    : DataTypes.STRING,
      unique :true,
      allowNull:false,
      validate:{
          isEmail : true
    }
  }
  })
  sequelize.define('orders', {
    state: {
      type:   DataTypes.ENUM,
      values: ['inCart', 'created', 'processing','canceled','complete']
    },
}); 
};


