export type Car = {
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

export type CarList = {
  carList: Car[];
};
