const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          profile: 'ADM',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('People', null, {});
  },
};

// comando yarn sequelize db:seed:all
