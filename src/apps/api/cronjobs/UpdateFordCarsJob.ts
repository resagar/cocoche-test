import { CronJob } from 'cron';
import { Inject, Service } from 'typedi';
import { CarsSearchFord } from './../../../Contexts/Cars/application/CarsSearchFord';
import { Job } from './Job';
import { CRON_TIME_SEARCH_CARS } from '../../../Contexts/shared/constants';

@Service()
export class UpdateFordCarsJob implements Job {
  private cronJob: CronJob;

  constructor(@Inject() private readonly carsSearchFord: CarsSearchFord) {
    this.cronJob = new CronJob(CRON_TIME_SEARCH_CARS, async () => {
      await this.task();
      console.log('Ford cars updated');
    });
  }

  start(): void {
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  private async task(): Promise<void> {
    await this.carsSearchFord.searchCars();
  }
}