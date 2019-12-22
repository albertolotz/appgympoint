// sintaxe import xxx from 'path'; apos instaçao sucrase.

import 'dotenv/config'; // para utilizar as variaves glocais .env , acessa process.env.VARIAVEL
import express from 'express';
import cors from 'cors'; // permite que outras aplicações acessem a API
import * as Sentry from '@sentry/node'; // bibliotca monitoramento erros on line.
import Youch from 'youch'; // melhora visualização das mesagens de erro.
import configSentry from './config/Sentry';
import 'express-async-errors'; // permite que express envio erros para sentry
import routes from './routes';
import './database';

class App {
  // metodo constructor é chamado automaticamente
  // quando instancia a classe.
  constructor() {
    this.server = express();

    Sentry.init(configSentry);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // outros metodos

  middlewares() {
    // set aplicação para receber requisições formato json
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors())
    this.server.use(express.json());
  }

  routes() {
    // importação das rotas contidas no arquivo ./routes.js
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // metodo que faz tratamento de erros na aplicação
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'internar error server' });
    }); // end of this.server.use
  } // end of exceptionHandler()
} // end of App

// exporta uma instancia de App com server.
export default new App().server;
