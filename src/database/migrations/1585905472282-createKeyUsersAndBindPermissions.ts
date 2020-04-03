import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateKeyUsersAndBindPermissions1585905472282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO `users` (`first_name`, `last_name`, `email`, `username`, `password`) VALUES\n' +
            '(\'admin\', \'admin\', \'cp_admin@ugotit.io\', \'cp_admin\', \'upgotit!2admin\')');
        await queryRunner.query('INSERT INTO `users` (`first_name`, `last_name`, `email`, `username`, `password`) VALUES\n' +
            '(\'test user\', \'test user\', \'test_user@ugotit.io\', \'test_user\', \'upgotit!2test_user\')');
        // for user cp_admin@ugotit.io
        await queryRunner.query('insert into `user_has_role` (`role_id`,`user_id`) VALUES ' +
            '((SELECT id from roles where slug = \'admin_app\') , (SELECT id from users where email = \'cp_admin@ugotit.io\'))');
        // for user test_user@ugotit.io
        await queryRunner.query('insert into `user_has_role` (`role_id`,`user_id`) VALUES ' +
            '((SELECT id from roles where slug = \'member_app\') , (SELECT id from users where email = \'test_user@ugotit.io\'))');
        await queryRunner.query('insert into `user_has_permission` (`permission_id`,`user_id`) VALUES ' +
            '((SELECT id from permissions where slug = \'test_permission\') , (SELECT id from users where email = \'test_user@ugotit.io\'))');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // for user cp_admin@ugotit.io
        await queryRunner.query('DELETE from `user_has_role` where role_id in (SELECT id from roles where slug = \'admin_app\');');
        // for user test_user@ugotit.io
        await queryRunner.query('DELETE from `user_has_role` where role_id in (SELECT id from roles where slug = \'member_app\');');
        await queryRunner.query('DELETE from `user_has_role` where permission_id in (SELECT id from roles where slug = \'test_permission\');');
    }

}
