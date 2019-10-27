import Sequelaze, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelaze.STRING,
        email: Sequelaze.STRING,
        gender: Sequelaze.STRING,
        age: Sequelaze.INTEGER,
        birth_date: Sequelaze.DATE,
        weight: Sequelaze.FLOAT,
        height: Sequelaze.FLOAT,
      },
      {
        sequelize,
      }
    );
  }
}

export default Students;
