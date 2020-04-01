import {IsBoolean} from 'class-validator';

export class BooleanResponse {
    @IsBoolean()
    public result: boolean;
}
