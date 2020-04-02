import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { Users } from '../models/Users';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class RoleEventSubscriber {

    @On(events.role.created)
    public onRoleCreate(user: Users): void {
        log.info('Role ' + user.toString() + ' created!');
    }
    @On(events.role.updated)
    public onRoleUpdate(user: Users): void {
        log.info('Role ' + user.toString() + ' updated!');
    }
    @On(events.role.deleted)
    public onRoleDelete(entity_id: number): void {
        log.info(`Role ${entity_id} deleted!`);
    }

}
