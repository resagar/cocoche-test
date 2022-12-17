import { Car } from './Car';

export interface Repository {
  save(cars: Array<Car>): Promise<string | null>;
  get(key: string): Promise<Array<Car>>;
}
