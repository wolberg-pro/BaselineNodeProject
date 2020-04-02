import * as express from 'express';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Users } from '../api/models/Users';
import { UserRepository } from '../api/repositories/UserRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';
import {PermissionRepository} from '../api/repositories/PermissionRepository';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private permissionRepository: PermissionRepository
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async locateUser(user_id: number): Promise<Users> {
        return await this.userRepository.findOneOrFail({id: user_id});
    }
    public async validateUser(email: string, password: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (await Users.comparePassword(user, password)) {
            return user;
        }

        return undefined;
    }

    public async validateUserPermission(user_id: number , permissionSlug: string[]): Promise<boolean> {
        if (permissionSlug.length === 0) {  return true; }
        const permissions = await this.permissionRepository.findByUsersByPermission(user_id , permissionSlug);
        if (permissions  && permissions.length !== 0) { return true; }
        return false;
    }

}
