import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { events } from './events';
import { Permission } from '@api/models/Permission';

const log = new Logger(__filename);

@EventSubscriber()
export class PermissionEventSubscriber {
    @On(events.permission.created)
    public onPermissionCreate(entity: Permission): void {
        log.info('Permission ' + entity.toString() + ' created!');
    }
    @On(events.permission.updated)
    public onPermissionUpdate(entity: Permission): void {
        log.info('Permission ' + entity.toString() + ' updated!');
    }
    @On(events.permission.deleted)
    public onPermissionDelete(entity_id: number): void {
        log.info(`Permission ${entity_id} deleted!`);
    }

}
