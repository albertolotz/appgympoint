import Sequelize, { Model } from 'sequelize';

class Registries extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Students, { foreignKey: 'student_id', as: 'Aluno' });
    this.belongsTo(models.Plans, { foreignKey: 'plan_id', as: 'Plano' });
  }
}

export default Registries;
