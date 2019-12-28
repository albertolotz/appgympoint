// importa apenas função de rotas do Express
import { Router } from 'express';
import RegistryController from './app/controllers/RegistryController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';
import OrderHelpController from './app/controllers/OrderHelpController';
import StudentSearchController from './app/controllers/StudentSearchController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
routes.post('/checkin/:id', CheckinController.store); // registra checkin do aluno - não autenticado
routes.get('/checkin/:id/list', CheckinController.index); // lista todos os checlins do usuário
routes.post('/sessions', SessionController.store); // Rota autenticação usuário

routes.post('/orderhelp/:id', OrderHelpController.store); // cadastro novo pedido de ajuda

routes.use(authMiddlewares);

routes.put('/orderhelp/:id', OrderHelpController.update); // responde pedido de ajuda
routes.get('/orderhelp', OrderHelpController.index); // consulta todos os chamados em aberto
routes.get('/orderhelp/:id', OrderHelpController.show); // consulta chamados em aberto de um aluno

routes.post('/students', StudentController.store); // rota cadastro estudantes
routes.put('/students/:id', StudentController.update); // Rota edição estudantes
routes.get('/students', StudentController.index); // Rota listagem todos
routes.get('/students/:id', StudentController.show); // listagem um Aluno
routes.delete('/students/:id', StudentController.delete); // Apaga Aluno

routes.get('/studentsall', StudentSearchController.index); // pesquisa todos os registros

routes.post('/plans', PlanController.store); // adiciona novo plano
routes.put('/plans/:id', PlanController.update); // atualiza planos
routes.get('/plans', PlanController.index); // lista planos ativos
routes.get('/plans/:id', PlanController.show); // lista um plano ativos
routes.put('/plans/:id/onoff', PlanController.delete); // Altera status do plano

routes.post('/registry', RegistryController.store); // cadastra plano para aluno.
routes.put('/registry/:id', RegistryController.update); // atualiza plano do aluno.
routes.delete('/registry/:id', RegistryController.delete); // destiva planos do aluno.
routes.get('/registry', RegistryController.index); // Lista Matriculas
routes.get('/registry/:id', RegistryController.show); // Lista uma Matricula
export default routes;
