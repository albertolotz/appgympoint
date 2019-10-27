module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'M=masculino, F=Feminino',
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      height: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('students');
  },
};

// comando: yarn sequelize db:migrate
// comando desfaz: yarn sequelze db:migrate:undo (ultima)
// comando desfaz: yarn sequelze db:migrate:undo:all (todas)
