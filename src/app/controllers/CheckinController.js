import * as Yup from 'yup';
import { subDays, addMonths, format, parseISO } from 'date-fns';

import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Registries from '../models/registries'; //
import Checkins from '../models/checkins'; //
import Students from '../models/students';

// array armazena campos que serão manipulados para input de dados e retorno ao frontend

class CheckinController {
  // validar se fez ate 5 checkins nos últimos 7 dias

  async store(req, res) {
    // valida se ID é numero
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid({ id: req.params.id }))) {
      res.status(400).json({ error: 'ID inválido' });
    }

    // procura Aluno pela chave primária.
    const studentExists = await Students.findByPk(req.params.id, {
      attributes: ['name', 'email'],
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Estudante não encontrado!' });
    }

    // Verifica se o aluno ja possui um plano ativo iqual ao informado.

    // https://sequelize-guides.netlify.com/search-operators/

    const planExiststoUser = await Registries.findOne({
      where: {
        student_id: req.params.id,
        active: true,
        end_date: { [Op.gt]: Date() },
      },
    });

    if (!planExiststoUser) {
      // FAZER DEPOIS: se data fim menor hoje, desativa o alu0

      return res
        .status(401)
        .json({ error: 'Não existe matricula ativa para este aluno.' });
    }
    // verificar de há mais de 5 checkins nos ultimos 7 dias
    const currDate = new Date();

    const checkinsTotal = await Checkins.count({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [subDays(currDate, 7), currDate],
        },
      },
    });

    if (checkinsTotal > 5) {
      return res
        .status(401)
        .json({ error: 'Limite máximo de 5 check-ins e, 7 dias exedido!.' });
    }
    // grava checkin
    const checkinDone = await Checkins.create({ student_id: req.params.id });
    return res.json({ checkinDone });
  }

  async index(req, res) {
    // valida se ID é numero
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid({ id: req.params.id }))) {
      res.status(400).json({ error: 'ID inválido' });
    }

    // procura Aluno pela chave primária.
    const studentExists = await Students.findByPk(req.params.id, {
      attributes: ['name', 'email'],
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Estudante não encontrado!' });
    }

    // executa a pesquisa
    const allCheckins = await Checkins.findAll({
      where: { student_id: req.params.id },
      attributes: ['student_id', ['created_at', 'Data Check-In']],
      include: [
        {
          model: Students,
          as: 'Aluno',
          attributes: ['name'],
          order: 'created_at',
        },
      ],
    });

    if (!allCheckins) {
      return res
        .status(401)
        .json({ error: 'Não existe checkin para o aluno selecionado!' });
    }

    return res.json({ allCheckins });
  } // end index
}

export default new CheckinController();
