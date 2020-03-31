import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import {UserResponse} from '../controllers/responses/UserResponse';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: number): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ id });
    }

    public async create(userResponse: UserResponse): Promise<User> {
        const user = new User();
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
    }

    public async update(id: number, userResponse: UserResponse): Promise<User| null> {
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
