import {IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';
import {BaseResponseEntity} from './common/BaseResponseEntity';
import {JSONSchema} from 'class-validator-jsonschema';

const enum genderEnum {
    male = 'male',
    female = 'female',
}
@JSONSchema({
    description: 'A User object',
    example: {
        id: '123',
        firstName: 'user first name',
        lastName: 'user last name',
        gender: 'male',
        phone: '0541234565',
        email: 'user@email.com',
    },
})
export class UserResponse extends BaseResponseEntity {
    @JSONSchema({
        description: 'user first name',
    })
    @IsNotEmpty()
    @MinLength(2, {
        message: 'first name is too short',
    })
    @MaxLength(50, {
        message: 'last name is too long',
    })
    public firstName: string;

    @JSONSchema({
        description: 'user last name',
    })
    @IsNotEmpty()
    @MinLength(2, {
        message: 'last name is too short',
    })
    @MaxLength(50, {
        message: 'last name is too long',
    })
    public lastName: string;

    @IsEmail()
    @JSONSchema({
        description: 'user email',
    })
    @IsNotEmpty()
    public email: string;

    @JSONSchema({
        description: 'username',
    })
    @IsNotEmpty()
    @MinLength(7, {
        message: 'username is too short',
    })
    @MaxLength(15, {
        message: 'username is too long',
    })
    public username: string;
    @JSONSchema({
        description: 'user gender',
    })
    @IsEnum(['male' , 'female'])
    public gender: genderEnum;
    @JSONSchema({
        description: 'user phone',
    })
    @IsNotEmpty()
    @MinLength(7, {
        message: 'phone is too short',
    })
    @MaxLength(15, {
        message: 'phone is too long',
    })
    public phone?: string;
    @JSONSchema({
        description: 'user password required when create user and he is not used via app when user via app (socal) the password it is his user social id',
    })
    @IsOptional()
    public password?: string;
    @JSONSchema({
        description: 'access_token',
    })
    @IsOptional()
    public access_token?: string;
}
