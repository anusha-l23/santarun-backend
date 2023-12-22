'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      tShirtSize: {
        type: Sequelize.STRING
      },
      nameOfTheBib: {
        type: Sequelize.STRING
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      contactName: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      acceptedTerms: {
        type: Sequelize.BOOLEAN
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CreateEvents',
          key: 'id', 
        },
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      personStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Registers');
  }
};