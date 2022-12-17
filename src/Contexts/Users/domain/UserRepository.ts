import Container, { Token } from 'typedi';
import { Repository as RepositoryDb } from 'typeorm';
import { User as UserModel } from './User';
import { User } from './entity/User.entity';
import { ConnectDb } from '../../shared/infrastructure/dataSourcePostgres';
import { Repository } from './Repository';

class UserRepository implements Repository {
  private readonly userRepository: RepositoryDb<User>;
  constructor(private readonly connect: ConnectDb) {
    this.userRepository = this.connect.appDataSource.getRepository(User);
  }

  public async save(user: UserModel): Promise<{ id: string; createdAt: Date }> {
    const newUser = this.userRepository.create(user);
    const { id, createdAt } = await this.userRepository.save(newUser);
    return { id, createdAt };
  }

  public async get(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } });
    return count === 1;
  }
}
export const USER_REPOSITORY = new Token<string>('UserRepository');
const connectDb = Container.get(ConnectDb);
Container.set(USER_REPOSITORY, new UserRepository(connectDb));
