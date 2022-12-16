import { Container } from 'typedi';
import { Controller } from './../controllers/Controller';
import { Router, Request, Response } from 'express';
import StatusController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const controller: Controller = Container.get(StatusController);
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
