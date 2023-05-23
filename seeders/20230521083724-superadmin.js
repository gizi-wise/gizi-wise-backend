/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('admins', [
        {
          id: uuidv4(),
          username: 'superadmin',
          email: 'super@admin.com',
          password: bcrypt.hashSync('superadmin', 10),
          name: 'Super Admin',
          image: null,
          role: 'superadmin',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  },
};
