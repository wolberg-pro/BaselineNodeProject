import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import jwt from 'jsonwebtoken';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import {UserResponse} from './responses/UserResponse';
import {UserRegisterRequest} from './requests/UserRegisterRequest';
import {UserLoginRequest} from './requests/UserLoginRequest';
import {AuthService} from '../../auth/AuthService';
import {UserLoginError} from '../errors/UserLoginError';
import {env} from '../../env';

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }], description: 'user api to control from basic api of login / register to get profile and more' })
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
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
    public findMe(@Req() req: any): Promise<User> {
        return req.user;
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
        description: 'login',

    })
    public create(@Body() body: UserRegisterRequest): Promise<User> {

        return this.userService.create(body);
    }

    @Post()
    @ResponseSchema(UserResponse, {
        description: 'register new user',

    })
    public async login(@Body() body: UserLoginRequest): Promise<User> {
        const user =  await this.userService.findOneByEmail(body.email);
        if (user) {
            if (await this.authService.validateUser(body.email, body.password) === undefined) {
                throw new UserLoginError();
            }
        }
        user.access_token =  jwt.sign({ id: user.id }, env.app.secretOrKey );
        return user;
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
