const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
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
  sequelize.define('image', {
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
  sequelize.define('order-line', {
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
    createdAt: {
      type: DataTypes.DATE,               
    get() {
          return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
      }
  },
  updatedAt: {
      type: DataTypes.DATE,
      get() {
          return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
      }
  },
}); 
};


