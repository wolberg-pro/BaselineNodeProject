import {IsEmail, IsNotEmpty} from 'class-validator';

export class BaseUserEntity {
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
}
