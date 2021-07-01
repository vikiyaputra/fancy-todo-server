'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey:`UserId`})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description tidak boleh kosong'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          name: 'Status tidak boleh kosong'
        }
      }
    },
    due_date: {type:DataTypes.DATE, validate:{
      dateRestriction(value){
        if(value < new Date()){
          throw `Tanggal harus lebih besar dari hari ini`
        }
      }
    }},
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          name: 'UserId tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};