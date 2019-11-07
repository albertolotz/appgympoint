// realiza a conexçao com banco de dados, também carrega todos os models para q a aplicação conheça estes models

import Sequelize from 'sequelize'; // responsavel pela conexção

import User from '../app/models/users'; // tabela users importada

import Students from '../app/models/students'; // tabela Students importada

import Plans from '../app/models/plans'; // tabela de planos

import DatabaseConfig from '../config/database'; // importa configurações do banco de dados

// array com todos os models da aplicação

const models = [User, Students, Plans];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // faz a conexão com a base de dados e carrega os models
    this.connection = new Sequelize(DatabaseConfig);
    // variavel connection é a conexão com base dados, é esperada dentro dos models no metodo init()

    // percorre o array models passando a conexao
    models.map(models => models.init(this.connection)); // este pode ser chamado em algum lugar
  }
}

export default new Database();
