import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Users } from '../models/Users';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import {EntityFoundError} from '../errors/EntityFoundError';
import {UserRegisterRequest} from '../controllers/requests/UserRegisterRequest';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Users[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: number): Promise<Users | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ id });
    }
    public findOneByEmail(email: string): Promise<Users | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ email });
    }

    public async create(userResponse: UserRegisterRequest): Promise<Users> {
        if (!this.findOneByEmail(userResponse.email)) {
            const user = new Users();
            user.firstName = userResponse.lastName;
            user.lastName = userResponse.lastName;
            user.email = userResponse.email;
            user.username = userResponse.username;
            user.phone = userResponse.phone;
            user.password = userResponse.password;
            this.log.info('Create a new user => ', user.toString());

            const newUser = await this.userRepository.save(user);
            this.eventDispatcher.dispatch(events.user.created, newUser);
            return newUser;
        } else {
            throw new EntityFoundError(userResponse.email);
        }
    }

    public async update(id: number, userResponse: UserRegisterRequest): Promise<Users| null> {
        this.log.info('Update a user');
        const user = await this.findOne(id);
        if (user) {
            user.username = userResponse.username;
            user.firstName = userResponse.firstName;
            user.lastName = userResponse.lastName;
            this.eventDispatcher.dispatch(events.user.updated, user);
        }

        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        this.eventDispatcher.dispatch(events.user.deleted, id);
        await this.userRepository.delete(id);
        return;
    }

}
