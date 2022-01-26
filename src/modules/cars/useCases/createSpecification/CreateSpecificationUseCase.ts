import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface Irequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) { }

    execute({ name, description }: Irequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists!");
        }

        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };