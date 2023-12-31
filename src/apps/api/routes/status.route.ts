import { Container } from 'typedi';
import { Controller } from './../controllers/Controller';
import { Router, Request, Response, NextFunction } from 'express';
import StatusController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const controller: Controller = Container.get(StatusController);
  router.get('/status', (req: Request, res: Response, next: NextFunction) => controller.run(req, res, next));
};
