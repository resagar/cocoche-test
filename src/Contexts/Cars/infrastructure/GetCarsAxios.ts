import { Axios } from 'axios';
import Container, { Token } from 'typedi';
import Http from './htpp';

class GetCarsAxios implements Http {
  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = new Axios({
      baseURL: process.env.API_CAR,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public async get(): Promise<any> {
    const result = await this.axiosInstance.get('/car_listing_presentation', { params: { list_length: 100 } });
    console.log(result);
    return 0;
  }
}

export const GET_CARS_AXIOS = new Token<string>('GetCarsAxios');
Container.set(GET_CARS_AXIOS, new GetCarsAxios());
