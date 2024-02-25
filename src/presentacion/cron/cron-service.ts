import { CronJob } from "cron";

type Crontime = string | Date;
type Ontick = () => void;

export class CronService {
  static createJob(cronTime: Crontime, onTick: Ontick) {
    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
