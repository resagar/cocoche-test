import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Service, Inject } from 'typedi';
import { Controller } from './Controller';
import { UserCreator } from '../../../Contexts/Users/application/UserCreator';
import { validationResult } from 'express-validator';
import { FORMAT_MESSAGE_VALIDATOR } from '../../../Contexts/shared/constants';

@Service()
export class UserPostController implements Controller {
  constructor(@Inject() private readonly userCreator: UserCreator) {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req).formatWith(FORMAT_MESSAGE_VALIDATOR);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const { name, phone, email } = req.body;
    const result = await this.userCreator.run({ name, phone, email });
    res.status(httpStatus.CREATED).send(result);
    return;
  }
}
