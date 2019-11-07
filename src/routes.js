// importa apenas função de rotas do Express
import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store); // Rota autenticação usuário
routes.use(authMiddlewares);
routes.post('/students', StudentController.store); // rota cadastro estudantes
routes.put('/students/:id', StudentController.update); // Rota edição estudantes
routes.get('/students', StudentController.index); // Rota listagem todos

routes.post('/plans', PlanController.store); // adiciona novo plano
routes.put('/plans/:id', PlanController.update); // atualiza planos
routes.get('/plans', PlanController.index); // lista planos ativos
routes.get('/plans/:id/onoff', PlanController.delete); // lista planos ativos

export default routes;
