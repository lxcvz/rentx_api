import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
})
 
specificationRoutes.get("/", (request, response) => {
    // const findAll = specificationRepository.list();

    // return response.status(200).send(findAll);
})

export { specificationRoutes }