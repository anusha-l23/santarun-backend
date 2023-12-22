'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    await queryInterface.addColumn('CreateEvents', 'categoryName', {
      type: Sequelize.STRING,
      allowNull: true, // Modify as per your requirements
    });
    await queryInterface.addColumn('CreateEvents', 'categoryAmount', {
      type: Sequelize.INTEGER,
      allowNull: true, // Modify as per your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CreateEvents', 'categoryName');
    await queryInterface.removeColumn('CreateEvents', 'categoryAmount');
  },
};
