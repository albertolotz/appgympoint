import * as Yup from 'yup'; // valida dados de entrada
import Plans from '../models/plans'; //
// array armazena campos que serão manipulados para input de dados e retorno ao frontend

class PlansController {
  // cadastro novo plano.
  async store(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .positive(),
      price: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }

    // valida a existência de algum cadastro que ja contenha O titulo igual informado
    const planExists = await Plans.findOne({
      where: { title: req.body.title, active: true },
    });

    if (planExists) {
      return res
        .status(400)
        .json({ error: 'Plano com nome informado já existe!' });
    }

    // caso não exista o plano com nome prossegue com o cadastro.
    const { id, title, duration, price, active } = await Plans.create(req.body); // student recebe aluno criado com dados de body.
    return res.json({
      id,
      title,
      duration,
      price,
      active,
    }); // retorna algo em formato de json para cliente aplicação, neste caso plans.
  }

  // Atualização Plano

  async update(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }

    // procura plano pela chave primária, se não encontra retorna mensagm de erro.
    const planExists = await Plans.findOne({
      where: { id: req.params.id, active: true },
    }); // varialvel planExists armazena resultado da busca

    if (!planExists) {
      return res.status(400).json({ error: 'Plano não encontrado!' });
    }

    // se encontrou o Plano, faz as alterações e envia dados alterados ao front end.
    const { id, title, duration, price, active } = await planExists.update(
      req.body
    );

    return res.json({
      id,
      title,
      duration,
      price,
      active,
    });
  }

  // Listagem
  async index(req, res) {
    const allPlans = await Plans.findAll(); // {where: { active: true },}
    return res.json(allPlans);
  }

  // ativar e desativar planos
  async delete(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object().shape({
      active: Yup.boolean(),
    });
    if (!(await schema.isValid(req.body))) {
      // req,body passa valores que schima que valida as entradas
      return res
        .status(400)
        .json({ error: 'Dados com formato inválido ou ausente!' });
    }

    // procura plano pela chave primária, se não encontra retorna mensagm de erro.
    const planExists = await Plans.findByPk(req.params.id); // varialvel planExists armazena resultado da busca

    if (!planExists) {
      return res.status(400).json({ error: 'Plano não encontrado!' });
    }

    // se encontrou o Plano, faz as alterações e envia dados alterados ao front end.
    const { id, title, duration, price, active } = await planExists.update(
      req.body
    );

    return res.json({
      id,
      title,
      duration,
      price,
      active,
    });
  }
}

export default new PlansController();
