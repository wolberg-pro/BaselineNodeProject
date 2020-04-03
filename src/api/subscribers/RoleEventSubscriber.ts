import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { events } from './events';
import { Role } from '../models/Role';

const log = new Logger(__filename);

@EventSubscriber()
export class RoleEventSubscriber {

    @On(events.role.created)
    public onRoleCreate(entity: Role): void {
        log.info('Role ' + entity.toString() + ' created!');
    }
    @On(events.role.updated)
    public onRoleUpdate(entity: Role): void {
        log.info('Role ' + entity.toString() + ' updated!');
    }
    @On(events.role.deleted)
    public onRoleDelete(entity_id: number): void {
        log.info(`Role ${entity_id} deleted!`);
    }

}
