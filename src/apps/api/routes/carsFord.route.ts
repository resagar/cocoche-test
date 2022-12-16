import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import { Controller } from '../controllers/Controller';
import CarsFordGetController from '../controllers/CarsFordGetController';

export const register = (router: Router) => {
  const carsFordController: Controller = Container.get(CarsFordGetController);
  router.get('/get_ford_cars', (req: Request, res: Response) => carsFordController.run(req, res));
};
