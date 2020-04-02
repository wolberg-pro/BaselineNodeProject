import {EntityRepository, Repository} from 'typeorm';
import {Permission} from '../models/Permission';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

    /**
     * by passing slug name as array will query to any matching permissions under that roles
     * @return User[]
     * @param user_id
     * @param permissions
     */
    public findByUsersByPermission(user_id: number, permissions: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`permissions.slug IN (${permissions.map(slug => `'${slug}'`).join(', ')})`)
            .andWhere(`users.id = :id`, {id: user_id})
            .leftJoinAndSelect('users.permissions', 'permissions')
            .getMany();
    }
}
