import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateBasicRoleAndPermissionData1585816775946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query('INSERT INTO `roles` (`slug`,`name`, `description`) VALUES\n' +
            '(\'admin_app\',\'Admin Application\', \'global role for admins of app\'),\n' +
            '(\'member_app\',\'member Application\', \'global role for members of app\')'
        );
        await queryRunner.query('INSERT INTO `permissions` (`slug`,`name`, `description`) VALUES\n' +
            '(\'admin_app\',\'Admin global permission\', \'global permission for admins of app\'),\n' +
            '(\'admin_user_control\',\'admin user control\', \'users with this permission can edit / delete outer users\'),\n' +
            '(\'test_permission\',\'test permission\', \'Permission testing\'),\n' +
            '(\'member_app\',\'member Application\', \'global role for members of app\')'
        );
        await queryRunner.query('insert into `role_has_permission` (`role_id`,`permission_id`) VALUES ' +
            '((SELECT id from roles where slug = \'admin_app\') , (SELECT id from permissions where slug = \'admin_app\')),' +
            '((SELECT id from roles where slug = \'admin_app\') , (SELECT id from permissions where slug = \'admin_user_control\')),' +
            '((SELECT id from roles where slug = \'admin_app\') , (SELECT id from permissions where slug = \'member_app\'))'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE from `role_has_permission` where role_id in (SELECT id from roles);');
        await queryRunner.query('DELETE from `roles` where slug in (' +
            '\'admin_app\',' +
            '\'member_app\',' +
            ');');
        await queryRunner.query('DELETE from `permissions` where slug in (' +
            '\'admin_app\',' +
            '\'admin_user_control\',' +
            '\'test_permission\',' +
            '\'member_app\',' +
            ');');
    }

}
