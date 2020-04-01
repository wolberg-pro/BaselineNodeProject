import { EntityRepository, Repository } from 'typeorm';
import {Permission} from '../models/Permission';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission>  {

    /**
     * by passing slug name as array will query to any matching permissions under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByUsersByPermission(permissions: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`permissions.slug IN (${permissions.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('users.permissions', 'permissions')
            .getMany();
    }
}
