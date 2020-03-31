import {IsEmail, IsNotEmpty} from 'class-validator';
import {BaseResponseEntity} from './common/BaseResponseEntity';

export class UserResponse extends BaseResponseEntity {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    public phone: string;

    public password?: string;
}
