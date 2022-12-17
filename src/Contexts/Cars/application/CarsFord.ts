import { Service, Inject } from 'typedi';
import { Repository } from '../domain/Repository';
import { Car } from '../domain/Car';
import { CAR_REPOSITORY_REDIS } from '../domain/CarRepositoryRedis';
import { CARS_FORD_REDIS_KEY } from '../../shared/constants';

@Service()
export class CarsFord {
  private readonly repository: Repository;

  constructor(@Inject(CAR_REPOSITORY_REDIS) repository: Repository) {
    this.repository = repository;
  }

  public async searchCars(): Promise<Array<Car>> {
    const cars = await this.repository.get(CARS_FORD_REDIS_KEY);
    return cars;
  }
}
