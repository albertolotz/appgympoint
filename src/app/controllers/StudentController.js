import User from '../models/users'; // utiliado para autenticação
import Students from '../models/students'; //

class StudentController {
  // cadastro novo aluno.
  async store(req, res) {
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

  // deleção aluno
}

export default new StudentController();
