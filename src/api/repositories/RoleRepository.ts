import { EntityRepository, Repository } from 'typeorm';

import { Role } from '../models/Role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>  {

    // constructor(private manager: EntityManager) {}
    /**
     * by passing slug name as array will query to any matching user under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByUsersByRole(roles: string[]) {
        return this.createQueryBuilder()
            .where(`role.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('role.users', 'user')
            .getMany();
    }

    /**
     * by passing slug name as array will query to any matching permissions under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByUsersByPermission(roles: string[]) {
        return this.createQueryBuilder()
            .select('permission')
            .where(`role.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('role.permission', 'permission')
            .getMany();
    }
}
