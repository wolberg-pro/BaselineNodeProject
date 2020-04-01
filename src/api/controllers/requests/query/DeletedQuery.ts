import {IsBoolean} from 'class-validator';

export class GetUsersQuery {
    @IsBoolean()
    public show_deleted: boolean;
}
