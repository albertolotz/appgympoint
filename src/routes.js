// importa apenas função de rotas do Express
import { Router } from 'express';
import Students from './app/models/students';

const routes = new Router();

routes.get('/', async (req, res) => {
  const students = await Students.create({
    name: 'Aluno numero 2',
    email: 'Aluno2@gmail.com',
    gender: 'F',
    age: 42,
    birth_date: '12/01/1977',
    weight: 60,
    height: 1.63,
  });

  return res.json(students);
});

export default routes;
