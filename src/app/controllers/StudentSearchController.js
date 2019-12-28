// import User from '../models/users'; // utiliado para autenticaçã
import Students from '../models/students'; //
// array armazena campos que serão manipulados para input de dados e retorno ao frontend

class StudentSearchController {
  // Listagem de todos
  async index(req, res) {
    const students = await Students.findAll();

    return res.json({
      students,
    });
  }
}

export default new StudentSearchController();
