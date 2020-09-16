const { DataTypes } = require("sequelize");
const crypto = require('crypto');
// var bcrypt = require('bcrypt');

module.exports = (sequelize) => {
sequelize.define("users", {
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
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin','client'],
      defaultValue: 'client',
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
          const rSalt = randomSalt();
          this.setDataValue('salt',rSalt);
          this.setDataValue(
            'password',
            crypto
              .createHmac('sha1', this.salt)
              .update(value)
              .digest('hex'),
          );
         },
      },    
      salt: {
        type: DataTypes.STRING,
      },
    });

    randomSalt = function() {
        return crypto.randomBytes(20).toString('hex');
    };
}