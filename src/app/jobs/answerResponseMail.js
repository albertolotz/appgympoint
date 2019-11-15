import Mail from '../../lib/mail';

class AnswerResponseMail {
  get key() {
    return 'AnswerResponseMail';
  }

  async handle({ data }) {
    const { studentData, helpOrders } = data;
    await Mail.sendMail({
      to: `${studentData.name} <${studentData.email}>`,
      subject: 'Resposta para sua Pergunta',
      template: 'answerquestion',
      context: {
        user_name: studentData.name,
        answer_response: helpOrders.answer,
      },
    });
  }
}
export default new AnswerResponseMail();
