import { NotFoundError } from './../../../apps/api/errors';
import { CARS_FORD_REDIS_KEY } from './../../shared/constants';
import { Car } from './Car';
import Container, { Token } from 'typedi';
import { ConnectRedis } from '../../shared/infrastructure/dataSourceRedis';
import { Repository } from './Repository';

class CarRepositoryRedis implements Repository {
  constructor(private readonly dataSource: ConnectRedis) {}

  public async save(cars: Array<Car>): Promise<string | null> {
    const redis = this.dataSource.appDataSource;
    const carsString = JSON.stringify(cars);
    const result = await redis.set(CARS_FORD_REDIS_KEY, carsString);
    return result;
  }

  public async get(key: string): Promise<Array<Car>> {
    const redis = this.dataSource.appDataSource;
    const carsString = await redis.get(key);
    if (!carsString) {
      throw new NotFoundError('Cars not found in redis', '');
    }
    return <Array<Car>>JSON.parse(carsString);
  }
}
export const CAR_REPOSITORY_REDIS = new Token<string>('CarRepositoryRedis');
const connectDataSource = Container.get(ConnectRedis);
Container.set(CAR_REPOSITORY_REDIS, new CarRepositoryRedis(connectDataSource));
