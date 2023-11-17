import { CarsFord } from '../../../Contexts/Cars/application/CarsFord';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

export default class CarsFordGetController implements Controller {
  constructor(private readonly carsFord: CarsFord) {}
  async run(req: Request, res: Response, next: NextFunction) {
    const cars = await this.carsFord.run();
    res.status(httpStatus.CREATED).send(cars);
  }
}
