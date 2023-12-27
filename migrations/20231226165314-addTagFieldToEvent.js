'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('EventCreates', 'tag', {
      type: Sequelize.STRING
    })
  },
  async down (queryInterface, Sequelize) {
 await queryInterface.removeColumn('EventCreates', "tag")
  }
};
