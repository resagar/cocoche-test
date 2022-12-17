import { CarsFord } from './../../../Contexts/Cars/application/CarsFord';
import { Inject, Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

@Service()
export default class CarsFordGetController implements Controller {
  constructor(@Inject() private readonly carsFord: CarsFord) {}
  async run(req: Request, res: Response, next: NextFunction) {
    const cars = await this.carsFord.searchCars();
    res.status(httpStatus.CREATED).send(cars);
  }
}
