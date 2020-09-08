const { DataTypes } = require('sequelize');

  module.exports = (sequelize) => {
    sequelize.define('order', {
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
}