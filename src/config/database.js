// utilização antes es6, pois é acesado por toda a aplicação, inclusive pelo sequelize
// inferface por linha de comando não consegue ler arquivos com export default
// add dependencias pg pg-hstore

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true, // garante que tera coluna create at e update at no banco de dados
    underscored: true,
    underscoredAll: true,
  },
};
