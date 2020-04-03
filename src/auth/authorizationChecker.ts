import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, permissions: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, permissions: string[]): Promise<boolean> {
        // here you can use request/response objects from action
        // also if decorator defines roles it needs to access the action
        // you can use them to provide granular access check
        // checker must return either boolean (true or false)
        // either promise that resolves a boolean value
        if (action.request.user) { // we check only we have valid user login into the system
            log.info('validate user permissions and user role permissions');
            return (
                await authService.validateUserPermission(action.request.user.id, permissions) ||
                await authService.validateUserRolePermission(action.request.user.id, permissions)
            );
        }
        log.info('skip validate permission access');
        return true; // this will say i can do what ever i need without the checks so need keep this in main
    };
}
