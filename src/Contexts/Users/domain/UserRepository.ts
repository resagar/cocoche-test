import { Repository as RepositoryDb } from 'typeorm';
import { User as UserModel } from './User';
import { User } from '../../shared/infrastructure/entity/User.entity';
import { DataSourcePostgres } from '../../shared/infrastructure/DataSourcePostgres';
import { Repository } from './Repository';
import { IntenalServerError } from '../../../apps/api/errors';

export class UserRepository implements Repository {
  private readonly userRepository: RepositoryDb<User>;

  constructor(private readonly connect: DataSourcePostgres) {
    this.userRepository = this.connect.appDataSource.getRepository(User);
  }

  public async save(user: UserModel): Promise<{ id: string; createdAt: Date }> {
    const newUser = this.userRepository.create(user);
    const { id, createdAt } = await this.userRepository.save(newUser).catch((err: Error) => {
      throw new IntenalServerError('An error occurred in the database', err.message);
    });
    return { id, createdAt };
  }

  public async get(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } }).catch((err: Error) => {
      console.log(err);
      throw new IntenalServerError('An error occurred in the database', err.message);
    });
    return count === 1;
  }
}
