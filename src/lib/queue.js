import Bee from 'bee-queue';
import WellcomeMail from '../app/jobs/wellcomeMail';
import AnswerResponseMail from '../app/jobs/answerResponseMail';
import RedisConfig from '../config/redis';

const jobs = [WellcomeMail, AnswerResponseMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: RedisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // bee.process(handle);
      bee
        .on('failed', (job, err) => {
          console.log(`Queue ${job.queue.name}: FAILED`, err);
        })
        .process(handle);
    });
  }
}

export default new Queue();
