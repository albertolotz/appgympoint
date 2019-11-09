module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      plan_id: {
        type: Sequelize.INTEGER,
        references: { model: 'plans', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('registries');
  },
};

// comando: yarn sequelize db:migrate
// comando desfaz: yarn sequelze db:migrate:undo (ultima)
// comando desfaz: yarn sequelze db:migrate:undo:all (todas)
