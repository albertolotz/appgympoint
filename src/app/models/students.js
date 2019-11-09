import Sequelize, { Model } from 'sequelize';
import { differenceInYears } from 'date-fns';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        gender: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return differenceInYears(new Date(), this.birth_date);
          },
        },
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Students;
