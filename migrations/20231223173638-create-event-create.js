'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventCreates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryDetails: {
        type: Sequelize.JSON
      },
      eventName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.DATE
      },
      eventPicture: {
        type: Sequelize.STRING
      },
      aboutEvent: {
        type: Sequelize.TEXT
      },
      orgEmail: {
        type: Sequelize.STRING
      },
      contactNum: {
        type: Sequelize.STRING
      },
      regOpenDate: {
        type: Sequelize.DATE
      },
      regCloseDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('EventCreates');
  }
};