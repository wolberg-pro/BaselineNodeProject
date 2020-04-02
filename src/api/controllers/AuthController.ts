import {
    Authorized, Body, JsonController, Post,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import jwt from 'jsonwebtoken';
import { Users } from '../models/Users';
import { UserService } from '../services/UserService';
import {UserResponse} from './responses/UserResponse';
import {UserRegisterRequest} from './requests/UserRegisterRequest';
import {UserLoginRequest} from './requests/UserLoginRequest';
import {AuthService} from '../../auth/AuthService';
import {UserLoginError} from '../errors/UserLoginError';
import {env} from '../../env';

@Authorized()
@JsonController('/auth')
@OpenAPI({ description: 'auth api to control from basic api of login / register to get profile and more' })
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }
    @Post('/register')
    @ResponseSchema(UserResponse, {
        description: 'register new user',
    })
    public create(@Body() body: UserRegisterRequest): Promise<Users> {
        return this.userService.create(body);
    }

    @Post('/login')
    @ResponseSchema(UserResponse, {
        description: 'register new user',
    })
    public async login(@Body() body: UserLoginRequest): Promise<Users> {
        const user =  await this.userService.findOneByEmail(body.email);
        if (user) {
            if (await this.authService.validateUser(body.email, body.password) === undefined) {
                throw new UserLoginError();
            }
        }
        user.access_token =  jwt.sign({ id: user.id }, env.app.secretOrKey );
        return user;
    }

}
