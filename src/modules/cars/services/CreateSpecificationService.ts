import { SpecificationsRepository } from "../repositories/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationsAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationsAlreadyExists)
      throw new Error("Specification already exists");

    this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationService };
