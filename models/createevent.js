'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CreateEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CreateEvent.init({
    eventName: DataTypes.STRING,
    location: DataTypes.STRING,
    year: DataTypes.DATE,
    eventPicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CreateEvent',
  });
  return CreateEvent;
};