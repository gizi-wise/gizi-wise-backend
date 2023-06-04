'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_upload_logs', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      url: {
        unique: true,
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      contentType: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      extension: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      moduleName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ownerId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ownerRole: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('file_upload_logs');
  },
};
