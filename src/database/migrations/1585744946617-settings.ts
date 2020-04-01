import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class settings1585744946617 implements MigrationInterface {

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
                }
            ],
        });
        await queryRunner.createTable(table);
        await queryRunner.query('INSERT INTO `settings` (`key`, `description`, `contextJSON`, `context`, `created_at`, `updated_at`) VALUES\n' +
            '(\'per_page_default\', \'defualt per page will effect when not match to per_page_options\', NULL, \'20\', \'2020-03-16 07:29:46\', \'2020-03-16 07:29:46\'),\n' +
            '(\'per_page_options\', \'how many items can user select per page\', \'[20, 50, 100, 200]\', NULL, \'2020-03-16 07:29:45\', \'2020-03-16 07:29:45\'),\n' +
            '(\'limit_deal_packs\', \'how many packs a deal can have (globaly)\', NULL, \'5\', NULL, NULL),\n' +
            '(\'limit_deal_extra\', \'how many extra a deal can have (globaly)\', NULL, \'5\', NULL, NULL),\n' +
            '(\'default_currency_id\', \'will auto select currency (or use that currency if selection not found) \', NULL, \'1\', NULL, NULL)');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('settings');
    }

}
