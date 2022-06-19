import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "Car_description",
      daily_rate: 45.75,
      license_plate: "EIF-1234",
      fine_amount: 20,
      brand: "Car_brand",
      category_id: "Category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "Car_description",
      daily_rate: 45.75,
      license_plate: "EIF-1234",
      fine_amount: 20,
      brand: "Car_brand",
      category_id: "Category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car2_name",
      description: "Car2_description",
      daily_rate: 67.75,
      license_plate: "FFF-1234",
      fine_amount: 25,
      brand: "Car2_brand",
      category_id: "Category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car_brand" });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "Car_description",
      daily_rate: 45.75,
      license_plate: "EIF-1234",
      fine_amount: 20,
      brand: "Car_brand",
      category_id: "Category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car2_name",
      description: "Car2_description",
      daily_rate: 67.75,
      license_plate: "FFF-1234",
      fine_amount: 25,
      brand: "Car2_brand",
      category_id: "Category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car_name" });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "Car_description",
      daily_rate: 45.75,
      license_plate: "EIF-1234",
      fine_amount: 20,
      brand: "Car_brand",
      category_id: "12345",
    });

    await carsRepositoryInMemory.create({
      name: "Car2_name",
      description: "Car2_description",
      daily_rate: 67.75,
      license_plate: "FFF-1234",
      fine_amount: 25,
      brand: "Car2_brand",
      category_id: "Category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars).toEqual([car]);
  });
});
