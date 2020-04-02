import {IsBoolean} from 'class-validator';
import {JSONSchema} from 'class-validator-jsonschema';
@JSONSchema({
    description: 'Operation activity status',
    example: {
        result: true,
    },
})
export class BooleanResponse {
    @JSONSchema({
        description: 'Operation status',
    })
    @IsBoolean()
    public result: boolean;
}
