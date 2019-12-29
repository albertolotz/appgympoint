module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('registries', 'active');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registries', {
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },
};
