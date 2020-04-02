import {MigrationInterface, QueryRunner, Table} from 'typeorm';

// tslint:disable-next-line:class-name
export class RoleHasPermissions1585744073085 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'role_has_permission',
            columns: [
                {
                    name: 'role_id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                }, {
                    name: 'permission_id',
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
        await queryRunner.dropTable('role_has_permission');
    }

}
