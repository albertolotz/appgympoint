// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/mail';

class WellcomeMail {
  get key() {
    return 'wellcomeMail'; // chave unica
  }

  // hande é chamado para o envio de cada email.
  async handle({ data }) {
    const { studentExists, planisActive, req, Registries } = data;

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Bem vindo(a) à Familia GymPoint',
      template: 'wellcome',
      context: {
        user_name: studentExists.name,
        plan_title: planisActive.title,
        value_total: Registries.finalPlanValue,
        // date_start: format(req.body.start_date, "'Dia' dd 'de' MMMM"),
        // date_end: format(dateEndRegistry, "'Dia' dd 'de' MMMM", { locale: pt }),
        date_start: req.body.start_date,
        date_end: Registries.dateEndRegistry,
      },
    });
  }
}

export default new WellcomeMail();
