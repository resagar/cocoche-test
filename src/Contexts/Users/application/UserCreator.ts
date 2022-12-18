import { Service, Inject } from 'typedi';
import { Repository } from '../domain/Repository';
import { USER_REPOSITORY } from '../domain/UserRepository';
import { User } from '../domain/User';

@Service()
export class UserCreator {
  private repository: Repository;

  constructor(@Inject(USER_REPOSITORY) repository: Repository) {
    this.repository = repository;
  }

  async run(user: User): Promise<{ id: string; createdAt: Date }> {
    const result = await this.repository.save(user);
    return result;
  }
}
