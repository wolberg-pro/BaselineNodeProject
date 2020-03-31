import {IsNotEmpty} from 'class-validator';
import {BaseResponseEntity} from './common/BaseResponseEntity';
export class RoleOrPermissionResponse extends  BaseResponseEntity {

    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public slug: string;

    public description: string;
}
