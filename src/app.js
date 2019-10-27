// sintaxe import xxx from 'path'; apos instaçao sucrase.
import express from 'express';
import routes from './routes';
import './database';

class App {
  // metodo constructor é chamado automaticamente
  // quando instancia a classe.
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // outros metodos
  middlewares() {
    // set aplicação para receber requisições formato json
    this.server.use(express.json());
  }

  routes() {
    // importação das rotas contidas no arquivo ./routes.js
    this.server.use(routes);
  }
}
// exporta uma instancia de App com server.
export default new App().server;
