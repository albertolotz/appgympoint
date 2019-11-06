// utilização antes es6, pois é acesado por toda a aplicação, inclusive pelo sequelize
// inferface por linha de comando não consegue ler arquivos com export default
// add dependencias pg pg-hstore
require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // garante que tera coluna create at e update at no banco de dados
    underscored: true,
    underscoredAll: true,
  },
};
