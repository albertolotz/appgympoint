import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // função que simula funcionamento igual ao async e await.
import auth from '../../config/auth';

export default async (req, res, next) => {
  // busca token no cabeçalho da requisição
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Usuário não autenticado!' });
  }
  // separa o resultado do cabeçalho pelo espaço em branco
  const [, token] = authHeader.split(' ');
  // autentica o usuário
  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.userID = decoded.id; // armazena o ID do usuário autenticado para futuras utilizações
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Usuário não autenticado!' });
  }
};
