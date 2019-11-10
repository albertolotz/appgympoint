import Bee from 'bee-queue';
import WellcomeMail from '../app/jobs/wellcomeMail';
import RedisConfig from '../config/redis';

const jobs = [WellcomeMail];

class Queue {
  constructor() {
    // criar uma fila para backgroud job
    this.queues = {};
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
  } // end init

  add(queue, job) {
    return this.queues[queue].bee.createjob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
} // end class

export default new Queue();
