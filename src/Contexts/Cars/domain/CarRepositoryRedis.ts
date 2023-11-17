import { CARS_FORD_REDIS_KEY } from '../../shared/constants';
import { Car } from './Car';
import { DataSourceRedis } from '../../shared/infrastructure/DataSourceRedis';
import { Repository } from './Repository';

export class CarRepositoryRedis implements Repository {
  constructor(private readonly dataSource: DataSourceRedis) {}

  public async save(cars: Array<Car>): Promise<string | null> {
    const redis = this.dataSource.appDataSource;
    const result = await redis.set(CARS_FORD_REDIS_KEY, JSON.stringify(cars));
    return result;
  }

  public async get(key: string): Promise<string | null> {
    const redis = this.dataSource.appDataSource;
    const carsString = await redis.get(key);
    return carsString;
  }
}
