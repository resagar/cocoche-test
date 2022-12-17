import { Controller } from '../controllers/Controller';
import { UserPostController } from '../controllers/UserPostController';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import saveUserRequestValidator from './validators/saveUserRequestValidator';
import { validateReqSchema } from './index';

export const register = (router: Router) => {
  const userPostController: Controller = Container.get(UserPostController);
  router.post(
    '/create_user',
    saveUserRequestValidator,
    validateReqSchema,
    (req: Request, res: Response, next: NextFunction) => userPostController.run(req, res, next)
  );
};
