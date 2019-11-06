// importa apenas função de rotas do Express
import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store); // Rota autenticação usuário
routes.use(authMiddlewares);
routes.post('/students', StudentController.store); // rota cadastro estudantes
routes.put('/students/:id', StudentController.update); // Rota edição estudantes
routes.get('/students', StudentController.index); // Rota listagem todos

export default routes;
