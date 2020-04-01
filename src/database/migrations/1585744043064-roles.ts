import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class roles1585744043064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
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
                    name: 'active_at',
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
        await queryRunner.dropTable('roles');
    }

}
