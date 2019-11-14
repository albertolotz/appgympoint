// importa apenas função de rotas do Express
import { Router } from 'express';
import RegistryController from './app/controllers/RegistryController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
routes.post('/checkin/:id', CheckinController.store); // registra checkin do aluno - não autenticado
routes.get('/checkin/:id/list', CheckinController.index); // lista todos os checlins do usuário
routes.post('/sessions', SessionController.store); // Rota autenticação usuário
routes.use(authMiddlewares);
routes.post('/students', StudentController.store); // rota cadastro estudantes
routes.put('/students/:id', StudentController.update); // Rota edição estudantes
routes.get('/students', StudentController.index); // Rota listagem todos

routes.post('/plans', PlanController.store); // adiciona novo plano
routes.put('/plans/:id', PlanController.update); // atualiza planos
routes.get('/plans', PlanController.index); // lista planos ativos
routes.get('/plans/:id/onoff', PlanController.delete); // lista planos ativos

routes.post('/registry', RegistryController.store); // cadastra plano para aluno.
routes.put('/registry/:id', RegistryController.update); // atualiza plano do aluno.
routes.delete('/registry/:id', RegistryController.delete); // destiva planos do aluno.
routes.get('/registry/:tp', RegistryController.index); // destiva planos do aluno.

export default routes;
