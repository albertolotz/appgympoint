import { format, parseISO } from 'date-fns';
import numeral from 'numeral';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/mail';

class WellcomeMail {
  get key() {
    return 'wellcomeMail';
  }

  async handle({ data }) {
    const { studentExists, plansData, planDetails } = data;
    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Bem vindo(a) à Familia GymPoint',
      template: 'wellcome',
      context: {
        user_name: studentExists.name,
        plan_title: planDetails.title,
        value_total: numeral(plansData.va).format('0,0.00'),
        date_start: format(
          parseISO(plansData.di),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        date_end: format(
          parseISO(plansData.de),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}
export default new WellcomeMail();
