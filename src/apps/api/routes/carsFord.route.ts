import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Controller } from '../controllers/Controller';
import CarsFordGetController from '../controllers/CarsFordGetController';

export const register = (router: Router) => {
  const carsFordController: Controller = Container.get(CarsFordGetController);
  router.get('/get_ford_cars', (req: Request, res: Response, next: NextFunction) =>
    carsFordController.run(req, res, next)
  );
};
