import {JSONSchema} from 'class-validator-jsonschema';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserLoginRequest {

    @JSONSchema({
        description: 'email of the user',
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @JSONSchema({
        description: 'user password required when create user and he is not used via app when user via app (social) the password it is his user social id',
    })
    @IsNotEmpty()
    public password: string;
}
