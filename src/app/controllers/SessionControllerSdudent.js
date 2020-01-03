import jwt from 'jsonwebtoken';
import User from '../models/students';
import auth from '../../config/auth'; // arquivo contendo chave do token

class SessionControllerSdudent {
  async store(req, res) {
    // pega dados do corpo da requisição
    const { email, id } = req.body;
    // produra um email existente
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Não Existe e-mail informado' });
    }
    // compara a senha cadastrada com a senha informada
    if (!(user.id && id)) {
      return res.status(401).json({ error: 'ID do Usuário não confere!' });
    }
    // se tudo correto
    const dados = user;

    return res.json({
      user: {
        id: dados.id,
        name: dados.name,
        email: dados.email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionControllerSdudent();
