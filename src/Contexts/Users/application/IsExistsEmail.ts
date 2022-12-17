import { Service, Inject } from 'typedi';
import { Repository } from '../domain/Repository';
import { USER_REPOSITORY } from '../domain/UserRepository';

@Service()
export class IsExistsEmail {
  private repository: Repository;

  constructor(@Inject(USER_REPOSITORY) repository: Repository) {
    this.repository = repository;
  }

  async run(email: string): Promise<boolean> {
    const result = await this.repository.get(email);
    return result;
  }
}
