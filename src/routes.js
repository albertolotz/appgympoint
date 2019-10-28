// importa apenas função de rotas do Express
import { Router } from 'express';

import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/students', StudentController.store); // store é o metodo utilizado em studentscoltroller

export default routes;
