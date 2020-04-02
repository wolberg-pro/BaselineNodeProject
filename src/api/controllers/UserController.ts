import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import {UserResponse} from './responses/UserResponse';
import {UserRegisterRequest} from './requests/UserRegisterRequest';
@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }], description: 'user api to control from basic api of login / register to get profile and more' })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @Authorized()
    @ResponseSchema(UserResponse, { isArray: true , description: 'will get all user in system' })
    public find(): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/profile')
    @Authorized()
    @ResponseSchema(UserResponse, { isArray: true , description: 'get current logged user profile' })
    public findMe(@CurrentUser({ required: true }) user: User): Promise<User[]> {
        return user;
    }

    @Get('/:id')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse , {
        description: 'will get the full info of a user by given id',
    })
    public one(@Param('id') id: number): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    @ResponseSchema(UserResponse, {
        description: 'register new user',

    })
    public create(@Body() body: UserRegisterRequest): Promise<User> {

        return this.userService.create(body);
    }

    @Put('/:id')
    @Authorized(['admin_app', 'admin_user_control'])
    @ResponseSchema(UserResponse, {
        description: 'update existing user',
    })
    public update(@Param('id') id: number, @Body() body: UserRegisterRequest): Promise<User> {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    @Authorized(['admin_app', 'admin_user_control'])
    // tslint:disable-next-line:no-null-keyword
    @ResponseSchema(null, {
        description: 'delete if existed user',
    })
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
