'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Register.belongsTo(models.EventCreate, {foreignKey: "eventId"})
    }
  }
  Register.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    tShirtSize: DataTypes.STRING,
    nameOfTheBib: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    acceptedTerms: DataTypes.BOOLEAN,
    eventId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    pincode: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    personStatus: DataTypes.STRING,
    medicalIssue:DataTypes.STRING,
    organization:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Register',
  });
  return Register;
};