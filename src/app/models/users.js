import Sequelize, { Model } from 'sequelize';
import bcrypty from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        profile: Sequelize.STRING,
      },
      {
        sequelize,
      }
    ); // classe pai que extendeu
    return this;
  }

  // metodo que compara password informado com o cadastrado
  checkPassword(password) {
    return bcrypty.compare(password, this.password_hash);
  }
}

export default User;
