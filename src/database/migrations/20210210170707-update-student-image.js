'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("students", "image", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.revomeColumn("students", "image");
  }
};
