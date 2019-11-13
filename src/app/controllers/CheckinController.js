import * as Yup from 'yup';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Registries from '../models/registries'; //
import Checkins from '../models/checkins'; //
import Students from '../models/students';
import Plans from '../models/plans';

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
      // FAZER DEPOIS: se data fim menor hoje, desativa o aluno.
      return res
        .status(401)
        .json({ error: 'Não existe matricula ativa para este aluno.' });
    }
    // ferificar de há mais de 5 checkins nos ultimos 7 dias

    // grava checkin
    const checkinDone = await Checkins.create({ student_id: req.params.id });
    return res.json({ checkinDone });
  }
}

// criar consulta de todos os checkins

export default new CheckinController();
