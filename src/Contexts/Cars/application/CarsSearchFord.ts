import Http from '../infrastructure/htpp';
import { Repository } from '../domain/Repository';
import { Car } from '../domain/Car';
import { IntenalServerError } from '../../../apps/api/errors';

export class CarsSearchFord {
  constructor(private readonly httpRequest: Http, private readonly repository: Repository) {}

  public async searchCars(): Promise<string | null> {
    const cars = await this.httpRequest.get<Car>();
    if (cars.length === 0) {
      throw new IntenalServerError('Error in get axios', '');
    }
    const result = await this.repository.save(cars.filter(car => car.brandDescription === 'FORD'));
    if (!result) {
      throw new IntenalServerError('Error in save Redis', '');
    }
    return result;
  }
}
