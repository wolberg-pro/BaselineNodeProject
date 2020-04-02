import { HttpError } from 'routing-controllers';

export class UserLoginError extends HttpError {
    constructor() {
        super(401, 'email or password incorrect');
    }
}
