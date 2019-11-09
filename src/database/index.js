// realiza a conexçao com banco de dados, também carrega todos os models para q a aplicação conheça estes models

import Sequelize from 'sequelize'; // responsavel pela conexção
import DatabaseConfig from '../config/database'; // importa configurações do banco de dados
import User from '../app/models/users'; // tabela users importada
import Registries from '../app/models/registries'; // tabela de matriculas
import Students from '../app/models/students'; // tabela Students importada
import Plans from '../app/models/plans'; // tabela de planos

// array com todos os models da aplicação

const models = [User, Plans, Students, Registries];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexão com a base de dados e carrega os models
    this.connection = new Sequelize(DatabaseConfig);
    // variavel connection é a conexão com base dados, é esperada dentro dos models no metodo init()

    // percorre o array models passando a conexao
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  } // end init
}

export default new Database();
