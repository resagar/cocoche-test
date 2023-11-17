import { redisRepositoryMock } from '../__mocks__/redisRepositoryMock';
import { CarsFord } from '../../../src/Contexts/Cars/application/CarsFord';
import { Car } from '../../../src/Contexts/Cars/domain/Car';

describe('Cars', () => {
  describe('CarsFord', () => {
    const redisRepository = new redisRepositoryMock();
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

    it('should get cars', async () => {
      const spyOnGetRedis = redisRepository.get.mockResolvedValue(JSON.stringify(cars));
      const carsFord = new CarsFord(redisRepository);
      const carList = await carsFord.run();

      expect(spyOnGetRedis).toHaveBeenCalled();
      expect(spyOnGetRedis).toHaveBeenCalledWith('list_cars_ford');
      expect(carList).toStrictEqual(cars);
    });

    it('should error in get cars', async () => {
      const spyOnGetRedis = redisRepository.get.mockResolvedValue(null);
      const carsFord = new CarsFord(redisRepository);

      await expect(carsFord.run()).rejects.toThrow();
      expect(spyOnGetRedis).toHaveBeenCalled();
      expect(spyOnGetRedis).toHaveBeenCalledWith('list_cars_ford');
    });
  });
});
