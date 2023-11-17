import { redisRepositoryMock } from '../__mocks__/redisRepositoryMock';
import { Car } from '../../../src/Contexts/Cars/domain/Car';
import { CarsSearchFord } from '../../../src/Contexts/Cars/application/CarsSearchFord';
import { GetCarsAxiosMock } from '../__mocks__/getCarsAxiosMock';

describe('Cars', () => {
  const redisRepository = new redisRepositoryMock();
  const httpMock = new GetCarsAxiosMock();
  const cars: Car[] = [
    {
      ownerId: '14ee2385-964e-4597-a4f7-543258ec13e3',
      carId: '8beb2b1e-ded6-4197-840c-2545859d957b',
      title: 'Ford Ecosport Freestyle 4x4 Full',
      doors: 5,
      cost: 12790,
      url: 'AA790UG/FRENTE',
      fuelType: 'Nafta',
      description: 'Excelente vehículo para',
      modelDescription: 'ECO SPORT 2.0 FREESTYLE 4X4   L/13',
      brandDescription: 'FORD',
      placeDescription: 'Lola Kieps 150, Progreso',
      latitude: '-53.79497130816327',
      longitude: '-67.69577744489796',
      location: 'string',
      calificationsAvg: 0.0,
      currency: 'ARS',
      year: 2016,
      rentsQuantity: 0
    }
  ];

  describe('CarsSearchFord', () => {
    it('should save cars list in redis', async () => {
      const carsSearchFord = new CarsSearchFord(httpMock, redisRepository);
      const spyOnGetHttp = httpMock.get.mockResolvedValue(cars);

      const spyOnSaveRedis = redisRepository.save.mockResolvedValue('OK');
      const result = await carsSearchFord.searchCars();

      expect(spyOnGetHttp).toHaveBeenCalled();
      expect(spyOnSaveRedis).toHaveBeenCalled();
      expect(spyOnSaveRedis).toHaveBeenCalledWith(cars);
      expect(result).toStrictEqual('OK');
    });
    it('should error save in redis', async () => {
      const carsSearchFord = new CarsSearchFord(httpMock, redisRepository);
      const spyOnGetHttp = httpMock.get.mockResolvedValue(cars);

      const spyOnSaveRedis = redisRepository.save.mockResolvedValue(null);

      await expect(carsSearchFord.searchCars()).rejects.toThrow();
      expect(spyOnGetHttp).toHaveBeenCalled();
      expect(spyOnSaveRedis).toHaveBeenCalled();
      expect(spyOnSaveRedis).toHaveBeenCalledWith(cars);
    });
  });
});
