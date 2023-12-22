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
      CreateEvent.hasMany(models.Register, { foreignKey: 'eventId' });
    }
  }
  CreateEvent.init({
    categoryDetails: {
      type: DataTypes.JSON, // Using JSON type for category details
      allowNull: true, // Modify as per your requirements
      get() {
        return this.getDataValue('categoryDetails');
      },
      set(val) {
        this.setDataValue('categoryDetails', val);
      },
    },
    eventName: DataTypes.STRING,
    location: DataTypes.STRING,
    year: DataTypes.DATE,
    eventPicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CreateEvent',
    tableName: 'CreateEvents',
  });
  return CreateEvent;
};