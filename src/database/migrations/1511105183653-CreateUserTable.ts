import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1511105183653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'first_name',
                    type: 'varchar',
                    length: '50',
                }, {
                    name: 'last_name',
                    type: 'varchar',
                    length: '50',
                }, {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                }, {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                } , {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                }, {
                    name: 'phone',
                    type: 'varchar',
                    length: '30',
                    isNullable: true,
                }, {
                    name: 'gender',
                    type: 'enum',
                    enum: [ 'male', 'female'],
                    isNullable: true,
                }, {
                    name: 'birthday',
                    type: 'date',
                    isNullable: true,
                }, {
                    name: 'phone_validation_at',
                    type: 'timestamp',
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
        await queryRunner.dropTable('users');
    }

}
