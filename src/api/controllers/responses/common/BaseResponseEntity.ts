import {IsDateString, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {JSONSchema} from 'class-validator-jsonschema';

export class BaseResponseEntity {
    @IsOptional()
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @JSONSchema({
        description: 'entity Id',
    })
    public id: number;

    @JSONSchema({
        description: 'entity last update at',
    })
    @IsNotEmpty()
    @IsDateString()
    public udatedAt: string;

    @JSONSchema({
        description: 'entity created at',
    })
    @IsNotEmpty()
    @IsDateString()
    public createdAt: string;
}
