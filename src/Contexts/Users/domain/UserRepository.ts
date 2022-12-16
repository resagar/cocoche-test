import Container, { Token } from 'typedi';
import { User as UserModel } from './User';
import { User } from './entity/User.entity';
import { ConnectDb } from '../../shared/infrastructure/dataSourcePostgres';
import { Repository } from './Repository';

class UserRepository implements Repository {
  constructor(private readonly connect: ConnectDb) {}

  public async save(user: UserModel): Promise<{ id: string; createdAt: Date }> {
    const repository = this.connect.appDataSource.getRepository(User);
    const newUser = repository.create(user);
    const { id, createdAt } = await repository.save(newUser);
    return { id, createdAt };
  }
}
export const USER_REPOSITORY = new Token<string>('UserRepository');
const connectDb = Container.get(ConnectDb);
Container.set(USER_REPOSITORY, new UserRepository(connectDb));
