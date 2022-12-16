import { Controller } from '../controllers/Controller';
import { UserPostController } from '../controllers/UserPostController';
import { Router, Request, Response } from 'express';
import { Container } from 'typedi';

export const register = (router: Router) => {
  const userPostController: Controller = Container.get(UserPostController);
  router.post('/create_user', (req: Request, res: Response) => userPostController.run(req, res));
};
