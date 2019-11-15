import * as Yup from 'yup';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Registries from '../models/registries'; //
import Students from '../models/students';
import Plans from '../models/plans';
import wellcomeMail from '../jobs/wellcomeMail';

import Queue from '../../lib/queue';
// array armazena campos que serão manipulados para input de dados e retorno ao frontend

class RegistryController {
  // cadastro nova matricula.
  async store(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }
    // procura Aluno pela chave primária.
    const studentExists = await Students.findByPk(req.body.student_id, {
      attributes: ['name', 'email'],
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Estudante não encontrado!' });
    }
    // procura o plano pela chave primária e verifica se esta ativo.
    const planisActive = await Plans.findOne({
      where: { id: req.body.plan_id, active: true },
      attributes: ['title'],
    });

    if (!planisActive) {
      return res.status(401).json({ error: 'Plano não encontrado!' });
    }

    // Verifica se o aluno ja possui um plano ativo iqual ao informado.
    const planExiststoUser = await Registries.findOne({
      where: {
        student_id: req.body.student_id,
        plan_id: req.body.plan_id,
        active: true,
      },
    });

    if (planExiststoUser) {
      return res
        .status(401)
        .json({ error: 'Já existe uma matricula ativa para este aluno.' });
    }
    // depois criar função.
    // Calculos de valor total do plano:
    const planDetails = await Plans.findByPk(req.body.plan_id);
    const finalPlanValue = planDetails.price * planDetails.duration;
    req.body.price = finalPlanValue;

    // calculo duração da matricula.
    const dateEndRegistry = addMonths(
      new Date(req.body.start_date),
      planDetails.duration
    );
    req.body.end_date = dateEndRegistry;

    // caso não exista validações acima Ok ...
    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    } = await Registries.create(req.body); // student recebe aluno criado com dados de body.

    //* *********************************** */

    // envia email informado que o registro esta concluido

    await Queue.add(wellcomeMail.key, {
      studentExists,
      planDetails,
      plansData: { de: end_date, di: start_date, va: price },
    });

    // **View** envia resposta para frontEnd
    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    }); // retorna algo em formato de json para cliente aplicação, neste caso student.
  }

  // atualizar matridula.

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }
    // procura de a matricula que esta tentando atualizar, pode encontrar mesmo
    // uma matricula que não estava ativa. :
    const registryExists = await Registries.findByPk(req.params.id);
    if (!registryExists) {
      return res.status(401).json({ error: 'Matricula não Existe' });
    }
    // depois criar função. ****************
    // Calculos de valor total do plano:
    const planDetails = await Plans.findByPk(req.body.plan_id);
    const finalPlanValue = planDetails.price * planDetails.duration;

    req.body.price = finalPlanValue;
    // calculo duração da matricula.
    const dateEndRegistry = addMonths(
      new Date(req.body.start_date),
      planDetails.duration
    );
    req.body.end_date = dateEndRegistry;
    req.body.active = true;

    // caso não exista validações acima Ok ...
    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    } = await registryExists.update(req.body); // student recebe aluno criado com dados de body.
    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    }); // retorna algo em formato de json para cliente aplicação, neste caso student.
  }

  async delete(req, res) {
    const registryExists = await Registries.findByPk(req.params.id);
    if (!registryExists) {
      return res.status(401).json({ error: 'Matricula não Existe' });
    }

    req.body.active = false;

    // caso não exista validações acima Ok ...
    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    } = await registryExists.update(req.body);
    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    });
  }

  // bloco listagem

  async index(req, res) {
    switch (req.params.tp) {
      case '0':
        // eslint-disable-next-line no-case-declarations
        const inactives = await Registries.findAll({
          where: { active: false },
          attributes: ['start_date', 'end_date', 'price', 'active'],
          include: [
            {
              model: Students,
              as: 'Aluno',
              attributes: ['name'],
            },
            {
              model: Plans,
              as: 'Plano',
              attributes: ['title'],
            },
          ],
        });
        return res.json(inactives);

      case '1':
        // eslint-disable-next-line no-case-declarations
        const actives = await Registries.findAll({
          where: { active: true },
          attributes: ['start_date', 'end_date', 'price', 'active'],
          include: [
            {
              model: Students,
              as: 'Aluno',
              attributes: ['name'],
            },
            {
              model: Plans,
              as: 'Plano',
              attributes: ['title'],
            },
          ],
        });
        return res.json(actives);

      case '2':
        // eslint-disable-next-line no-case-declarations
        const allReg = await Registries.findAll({
          attributes: ['start_date', 'end_date', 'price', 'active'],
          include: [
            {
              model: Students,
              as: 'Aluno',
              attributes: ['name'],
            },
            {
              model: Plans,
              as: 'Plano',
              attributes: ['title'],
            },
          ],
        });
        return res.json(allReg);

      default:
        return res.status(401).json({ error: 'Opção de busca não Válida' });
    }
  }
}

export default new RegistryController();
