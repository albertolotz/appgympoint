// importa apenas função de rotas do Express
import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
routes.use(authMiddlewares);
routes.post('/sessions', SessionController.store); // Rota autenticação usuário
routes.post('/students', StudentController.store); // rota cadastro estudantes
routes.put('/students', StudentController.update); // Rota edição estudantes

export default routes;
