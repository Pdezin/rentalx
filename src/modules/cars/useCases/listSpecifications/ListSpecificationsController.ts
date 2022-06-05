import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  handle(request: Request, response: Response): Response {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const specifications = listSpecificationsUseCase.execute();

    return response.json(specifications);
  }
}

export { ListSpecificationsController };
