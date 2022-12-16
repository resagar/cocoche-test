import { CarsSearchFord } from './../../../Contexts/Cars/application/CarsSearchFord';
import { Inject, Service } from 'typedi';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

@Service()
export default class CarsFordGetController implements Controller {
  constructor(@Inject() private readonly carsSearchFord: CarsSearchFord) {}
  async run(req: Request, res: Response) {
    await this.carsSearchFord.searchCars();
    res.status(httpStatus.OK).send();
  }
}
