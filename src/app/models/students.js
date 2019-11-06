import Sequelaze, { Model } from 'sequelize';
import { differenceInYears } from 'date-fns';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelaze.STRING,
        email: Sequelaze.STRING,
        gender: Sequelaze.STRING,
        birth_date: Sequelaze.DATE,
        age: {
          type: Sequelaze.VIRTUAL,
          get() {
            return differenceInYears(new Date(), this.birth_date);
          },
        },
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
