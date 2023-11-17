import Http from '../../../src/Contexts/Cars/infrastructure/Htpp';

export class GetCarsAxiosMock implements Http {
  get = jest.fn();
}
