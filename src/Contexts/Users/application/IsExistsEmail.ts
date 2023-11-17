import { Repository } from '../domain/Repository';

export class IsExistsEmail {
  constructor(private readonly repository: Repository) {}

  async run(email: string): Promise<boolean> {
    const result = await this.repository.get(email);
    return result;
  }
}
