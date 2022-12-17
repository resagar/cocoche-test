import { Controller } from '../controllers/Controller';
import { UserPostController } from '../controllers/UserPostController';
import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import { SaveUserRequestValidator } from './validators/saveUserRequestValidator';

export const register = (router: Router) => {
  const userPostController: Controller = Container.get(UserPostController);
  const saveUserRequestValidator = Container.get(SaveUserRequestValidator);
  router.post('/create_user', saveUserRequestValidator.validator, (req: Request, res: Response) =>
    userPostController.run(req, res)
  );
};
