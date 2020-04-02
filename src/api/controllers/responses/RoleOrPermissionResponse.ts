import {IsNotEmpty, MinLength, MaxLength, IsAlphanumeric, IsOptional} from 'class-validator';
import {BaseResponseEntity} from './common/BaseResponseEntity';
import {JSONSchema} from 'class-validator-jsonschema';
@JSONSchema({
    description: 'A role/permission object',
    example: {
        id: '123',
        name: 'entity name',
        slug: 'entity slug',
        description: 'long text',
    },
})
export class RoleOrPermissionResponse extends  BaseResponseEntity {
    @JSONSchema({
        description: 'entity name',
    })
    @IsNotEmpty()
    @MinLength(6, {
        message: 'first name is too short',
    })
    @MaxLength(100, {
        message: 'last name is too long',
    })
    public name: string;
    @JSONSchema({
        description: 'entity slug name',
    })
    @MinLength(10, {
        message: 'first name is too short',
    })
    @MaxLength(50, {
        message: 'last name is too long',
    })
    @IsNotEmpty()
    public slug: string;
    @JSONSchema({
        description: 'entity description',
    })
    @IsOptional()
    @IsAlphanumeric()
    public description: string;
}
