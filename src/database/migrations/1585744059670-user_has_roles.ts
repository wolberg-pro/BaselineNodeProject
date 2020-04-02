import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class UserHasRoles1585744059670 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'user_has_role',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                }, {
                    name: 'role_id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                }, {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_has_role');
    }

}
