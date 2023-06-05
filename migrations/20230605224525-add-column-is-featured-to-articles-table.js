'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('articles', 'isFeatured', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('articles', 'isFeatured');
  },
};
