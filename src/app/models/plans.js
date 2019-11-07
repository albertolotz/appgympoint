import Sequelaze, { Model } from 'sequelize';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelaze.STRING,
        duration: Sequelaze.INTEGER,
        price: Sequelaze.FLOAT,
        active: Sequelaze.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plans;
