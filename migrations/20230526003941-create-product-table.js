'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      latinName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      origin: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(['raw', 'processed']),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      servingSize: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      servingUnit: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      ediblePortion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 100,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
    try {
      await queryInterface.addConstraint('products', {
        type: 'foreign key',
        name: 'constraint_product_to_category',
        fields: ['categoryId'],
        references: {
          table: 'categories',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    } catch (error) {
      await queryInterface.dropTable('products');
    }
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'products',
      'constraint_product_to_category',
    );
    await queryInterface.dropTable('products');
  },
};
