import { Service, Inject } from 'typedi';
import { Repository } from '../domain/Repository';
import { USER_REPOSITORY } from '../domain/UserRepository';
import { User } from '../domain/User';
import { v4 as uuidv4 } from 'uuid';

@Service()
export class UserCreator {
  private repository: Repository;

  constructor(@Inject(USER_REPOSITORY) repository: Repository) {
    this.repository = repository;
  }

  async run({
    name,
    phone,
    email
  }: {
    name: string;
    phone: string;
    email: string;
  }): Promise<{ id: string; createdAt: Date }> {
    const uuid = uuidv4();
    const user = new User({ id: uuid, name, phone, email });
    return await this.repository.save(user);
  }
}
