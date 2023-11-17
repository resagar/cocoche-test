import { Axios } from 'axios';
import Http from './htpp';

export class GetCarsAxios implements Http {
  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = new Axios({
      baseURL: 'http://server.cocoche.com.ar',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public async get<Car>(): Promise<Array<Car>> {
    const { data } = await this.axiosInstance.get('/car_listing_presentation', { params: { list_length: 100 } });
    const list = JSON.parse(data);
    const { carList } = list;
    return carList;
  }
}
