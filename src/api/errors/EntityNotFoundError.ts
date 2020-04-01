import { HttpError } from 'routing-controllers';

export class EntityNotFoundError extends HttpError {
    constructor(id: string|number) {
        super(500, `Entity not found '${id}`);
    }
}
