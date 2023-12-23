'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCreate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventCreate.hasMany(models.Register, { foreignKey: 'eventId' });
    }
  }
  EventCreate.init({
    categoryDetails: {
      type: DataTypes.JSON, 
      allowNull: true,
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
    eventPicture: DataTypes.STRING,
    aboutEvent: DataTypes.TEXT,
    orgEmail: DataTypes.STRING,
    contactNum: DataTypes.STRING,
    regOpenDate: DataTypes.DATE,
    regCloseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EventCreate',
    tableName: 'EventCreates',
  });
  return EventCreate;
};