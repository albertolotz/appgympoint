import jwt from 'jsonwebtoken';
import User from '../models/users';
import auth from '../../config/auth'; // arquivo contendo chave do token

class SessionColtroller {
  async store(req, res) {
    // pega dados do corpo da requisição
    const { email, password } = req.body;
    // produra um email existente
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não Existe!' });
    }
    // compara a senha cadastrada com a senha informada
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha do Usuário não confere!' });
    }
    // se tudo correto
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionColtroller();
