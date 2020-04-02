import * as Faker from 'faker';
import {Users} from '../../api/models/Users';
import {Factory} from 'typeorm-factory';

export const CreateUser = async (totalUsers: number = 1) => {
    const factory = new Factory(Users);
    factory.attr('id', Faker.random.number());
    factory.attr('firstName', Faker.name.firstName());
    factory.attr('lastName', Faker.name.lastName());
    factory.attr('email', Faker.internet.email());
    factory.attr('username', Faker.internet.userName());
    factory.attr('password', '1234');
    if (totalUsers > 1) {
        return await factroy.buildList(totalUsers);
    }
    return await factory.build();
};
