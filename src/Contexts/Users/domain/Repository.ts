import { User } from './User';

export interface Repository {
  save(user: User): Promise<{ id: string; createdAt: Date }>;
  get(email: string): Promise<boolean>;
}
