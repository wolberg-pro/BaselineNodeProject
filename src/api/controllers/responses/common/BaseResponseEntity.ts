import {IsDateString, IsNotEmpty, IsNumber} from 'class-validator';

export class BaseResponseEntity {
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsDateString()
    public udatedAt: string;

    @IsNotEmpty()
    @IsDateString()
    public createdAt: string;
}
