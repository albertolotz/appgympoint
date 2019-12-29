// import Mongoose from 'mongoose';
import HelpOrders from '../schemas/helpOrders';
import AnswerResponseMail from '../jobs/answerResponseMail';
import Students from '../models/students';
import Queue from '../../lib/queue';

class HelpordersController {
  async store(req, res) {
    const helpOrders = await HelpOrders.create({
      student_id: req.params.id,
      question: req.body.question,
      answer: null,
      answer_at: null,
    });

    return res.json({ helpOrders });
  } // end store msg: 'Pergunta enviada com sucesso, aguarde a resposta!',

  async update(req, res) {
    // avaliar add try pois pode ocorrer algum erro.
    const helpOrders = await HelpOrders.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        answer_at: new Date(),
        answer: req.body.answer,
      },
      { new: true }
    );

    // enviar email
    const studentData = await Students.findByPk(helpOrders.student_id);

    await Queue.add(AnswerResponseMail.key, {
      studentData,
      helpOrders,
    });

    // envia resposta para front end.

    return res.json({ helpOrders });
  } // end update

  // listagem pedido de auxilio sem resposta

  async index(req, res) {
    const helpOrders = await HelpOrders.find({ answer_at: null }).sort({
      createdAt: 1,
    });
    return res.json({ helpOrders });
  } // end index

  // listagem pedido de auxilio de um unico aluno

  async show(req, res) {
    const helpOrders = await HelpOrders.find({
      student_id: req.params.id,
    }).sort({ createdAt: 1 });

    return res.json({ helpOrders });
  } // end index
} // end class

export default new HelpordersController();
