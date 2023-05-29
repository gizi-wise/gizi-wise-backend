'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tkpis', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
      },
      unit: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
    try {
      await queryInterface.addConstraint('tkpis', {
        type: 'foreign key',
        name: 'constraint_tkpi_to_product',
        fields: ['productId'],
        references: {
          table: 'products',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    } catch (error) {
      await queryInterface.dropTable('tkpis');
    }
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'tkpis',
      'constraint_tkpi_to_product',
    );
    await queryInterface.dropTable('tkpis');
  },
};
