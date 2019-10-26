// importa apenas função de rotas do Express
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'world.' });
});

export default routes;
