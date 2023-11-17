import { User } from '../../../Contexts/Users/domain/User';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { UserCreator } from '../../../Contexts/Users/application/UserCreator';
import { v4 as uuidv4 } from 'uuid';

export class UserPostController implements Controller {
  constructor(private readonly userCreator: UserCreator) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { name, phone, email } = req.body;
    const id = uuidv4();
    const createdAt = new Date();
    const user = new User({ id, name, phone, email, createdAt });
    const result = await this.userCreator.run(user);
    res.status(httpStatus.CREATED).send(result);
    return;
  }
}
