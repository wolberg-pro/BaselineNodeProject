import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Permissions1585744048621 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'permissions',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'slug',
                    type: 'varchar',
                    length: '100',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '200',
                }, {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                }, {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
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
        await queryRunner.dropTable('permissions');
    }
}
