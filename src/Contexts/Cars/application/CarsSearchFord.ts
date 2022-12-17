import { GET_CARS_AXIOS } from '../infrastructure/GetCarsAxios';
import { Service, Inject } from 'typedi';
import Http from '../infrastructure/htpp';
import { Repository } from '../domain/Repository';
import { Car } from '../domain/Car';
import { CAR_REPOSITORY_REDIS } from '../domain/CarRepositoryRedis';

@Service()
export class CarsSearchFord {
  private readonly httpRequest: Http;
  private readonly repository: Repository;

  constructor(@Inject(GET_CARS_AXIOS) http: Http, @Inject(CAR_REPOSITORY_REDIS) repository: Repository) {
    this.httpRequest = http;
    this.repository = repository;
  }

  public async searchCars(): Promise<string | null> {
    const cars = await this.httpRequest.get<Car>();
    const result = await this.repository.save(cars.filter(car => car.brandDescription === 'FORD'));
    return result;
  }
}
