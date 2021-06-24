const {hashPassword} = require(`../helpers/bcrypt.js`)
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey:`UserId`})
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance, options){
        instance.password = hashPassword(instance.password)
  }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};