import { Repository } from '../domain/Repository';
import { Car } from '../domain/Car';
import { CARS_FORD_REDIS_KEY } from '../../shared/constants';
import { NotFoundError } from '../../../apps/api/errors';

export class CarsFord {
  private readonly repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  public async run(): Promise<Car[]> {
    const carsString = await this.repository.get(CARS_FORD_REDIS_KEY);
    if (!carsString) {
      throw new NotFoundError('Cars not found in redis', '');
    }
    return Car.stringToJson(carsString);
  }
}
