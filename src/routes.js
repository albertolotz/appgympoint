// importa apenas função de rotas do Express
import { Router } from 'express';
import User from './app/models/users';

const routes = new Router();

routes.put('/', async (req, res) => {
  const user = await User.findByPk(1);

  return res.json(user);
});

export default routes;
