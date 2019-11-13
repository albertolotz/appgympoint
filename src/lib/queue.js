import Bee from 'bee-queue';
import WellcomeMail from '../app/jobs/wellcomeMail';
import RedisConfig from '../config/redis';

const jobs = [WellcomeMail];

class Queue {
  constructor() {
<<<<<<< HEAD
    this.queues = {};

    this.init();
=======
    // criar uma fila para backgroud job
    this.queues = {};
>>>>>>> 2fe6b73b48e2887236ac674e50e0a981c4547fe3
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
<<<<<<< HEAD
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
=======
  } // end init

  add(queue, job) {
    return this.queues[queue].bee.createjob(job).save();
>>>>>>> 2fe6b73b48e2887236ac674e50e0a981c4547fe3
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
<<<<<<< HEAD

      bee.process(handle);
    });
  }
}
=======
      bee.process(handle);
    });
  }
} // end class
>>>>>>> 2fe6b73b48e2887236ac674e50e0a981c4547fe3

export default new Queue();
