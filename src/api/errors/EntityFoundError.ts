import { HttpError } from 'routing-controllers';

export class EntityFoundError extends HttpError {
    constructor(id: string|number) {
        super(500, `Entity found '${id}`);
    }
}
