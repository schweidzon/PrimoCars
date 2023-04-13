import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";
import { Car } from "../../protocols.js";


async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function upsertCar(id: number, model: string, licensePlate: string, year: number, color: string) {
  if(!id)  {
    const checkCar = await carRepository.getCarWithLicensePlate(licensePlate)
    if(checkCar) {
      throw conflictError(`Car with plate ${licensePlate} already exists`)
    }
  }
  await carRepository.upsertCar(id, model, licensePlate, year, color);
}

async function deleteCar(id: number) {
 const checkCar =  await getCar(id);
 if(!checkCar) {
  throw notFoundError();
 }
 await carRepository.deleteCar(id);
}


const carService = {
  getCars,
  getCar,
  upsertCar,
   deleteCar,
   
}

export default carService;