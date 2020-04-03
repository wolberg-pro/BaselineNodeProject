import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { Users } from '@api/models/Users';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<Users | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<Users | undefined> {
        return action.request.user;
    };
}
