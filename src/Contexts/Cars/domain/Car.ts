export type CarType = {
  ownerId: string;
  carId: string;
  title: string;
  doors: number;
  cost: number;
  url: string;
  fuelType: string;
  description: string;
  modelDescription: string;
  brandDescription: string;
  placeDescription: string;
  latitude: string;
  longitude: string;
  location: string;
  calificationsAvg: number;
  currency: string;
  year: number;
  rentsQuantity: number;
};
export class Car {
  public ownerId: string;
  public carId: string;
  public title: string;
  public doors: number;
  public cost: number;
  public url: string;
  public fuelType: string;
  public description: string;
  public modelDescription: string;
  public brandDescription: string;
  public placeDescription: string;
  public latitude: string;
  public longitude: string;
  public location: string;
  public calificationsAvg: number;
  public currency: string;
  public year: number;
  public rentsQuantity: number;

  constructor(car: CarType) {
    Object.assign(this, car);
  }
  static stringToJson(carsList: string): Car[] {
    return <Car[]>JSON.parse(carsList);
  }
}
