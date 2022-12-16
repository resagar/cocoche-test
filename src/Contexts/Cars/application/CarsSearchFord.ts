import { GET_CARS_AXIOS } from '../infrastructure/GetCarsAxios';
import { Service, Inject } from 'typedi';
import Http from '../infrastructure/htpp';

@Service()
export class CarsSearchFord {
  private httpRequest: Http;

  constructor(@Inject(GET_CARS_AXIOS) http: Http) {
    this.httpRequest = http;
  }

  public async searchCars() {
    await this.httpRequest.get();
  }
}
