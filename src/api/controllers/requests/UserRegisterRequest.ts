import {BaseUserEntity} from './common/BaseUserEntity';
import {IsNotEmpty} from 'class-validator';

export class UserRegisterRequest extends BaseUserEntity {
    @IsNotEmpty()
    public password: string;
}
