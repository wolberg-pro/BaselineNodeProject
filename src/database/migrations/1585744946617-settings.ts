import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Settings1585744946617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'settings',
            columns: [
                {
                    name: 'key',
                    type: 'varchar',
                    length: '100',
                    isPrimary: true,
                }, {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                }, {
                    name: 'contextJSON',
                    type: 'json',
                    isNullable: true,
                }, {
                    name: 'context',
                    type: 'text',
                    isNullable: true,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('settings');
    }

}
