import * as Yup from 'yup';
import User from '../models/users'; // utiliado para autenticação
import Students from '../models/students'; //
// array armazena campos que serão manipulados para input de dados e retorno ao frontend

class StudentController {
  // cadastro novo aluno.
  async store(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      gender: Yup.string(1).required(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      birth_date: Yup.date().required(),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }

    // valida a existência de algum cadastro que ja contenha o email informado
    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Email já cadastrado para outro aluno!' });
    }

    // caso não exista o email adastrado prossegue com o cadastro.
    const {
      id,
      name,
      email,
      gender,
      age,
      birth_date,
      weight,
      height,
    } = await Students.create(req.body); // student recebe aluno criado com dados de body.
    return res.json({
      id,
      name,
      email,
      gender,
      age,
      birth_date,
      weight,
      height,
    }); // retorna algo em formato de json para cliente aplicação, neste caso student.
  }

  // edição aluno

  async update(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      gender: Yup.string(1).required(),
      age: Yup.number()
        .positive()
        .integer(),
      birth_date: Yup.date().required(),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }

    // procura estudante pela chave primária, se não encontra retorna mensagm de erro.
    const studentExists = await Students.findByPk(req.body.id); // varialvel studentExists armazena resultado da busca

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não encontrado!' });
    }
    // se encontrou o estudante, faz as alterações e envia dados alterados ao front end.
    const {
      id,
      name,
      email,
      gender,
      age,
      birth_date,
      weight,
      height,
    } = await studentExists.update(req.body);

    return res.json({
      id,
      name,
      email,
      gender,
      age,
      birth_date,
      weight,
      height,
    });
  }
  // deleção aluno
}

export default new StudentController();
