import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class UserPermissionsAndRolesFK1585744467743 implements MigrationInterface {
    private tableRolesUserForeignKey = new TableForeignKey({
        name: 'fk_user_role_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
    });
    private tableRolesRoleForeignKey = new TableForeignKey({
        name: 'fk_user_role_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
    });
    private tablePermissionsUserForeignKey = new TableForeignKey({
        name: 'fk_user_permission_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
    });

    private tablePermissionsPermissionForeignKey = new TableForeignKey({
        name: 'fk_user_permission_permission_id',
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
    });
    private tableRolesToPermissionRoleIdForeignKey = new TableForeignKey({
        name: 'fk_role_permission_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
    });
    private tableRolesToPermissionPermissionIdForeignKey = new TableForeignKey({
        name: 'fk_role_permission_permission_id',
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('user_has_role', this.tableRolesUserForeignKey);
        await queryRunner.createForeignKey('user_has_role', this.tableRolesRoleForeignKey);
        await queryRunner.createForeignKey('user_has_permission', this.tablePermissionsUserForeignKey);
        await queryRunner.createForeignKey('user_has_permission', this.tablePermissionsPermissionForeignKey);
        await queryRunner.createForeignKey('role_has_permission', this.tableRolesToPermissionRoleIdForeignKey);
        await queryRunner.createForeignKey('role_has_permission', this.tableRolesToPermissionPermissionIdForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('user_has_role', this.tableRolesUserForeignKey);
        await queryRunner.dropForeignKey('user_has_role', this.tableRolesRoleForeignKey);
        await queryRunner.dropForeignKey('user_has_permission', this.tablePermissionsUserForeignKey);
        await queryRunner.dropForeignKey('user_has_permission', this.tablePermissionsPermissionForeignKey);
        await queryRunner.dropForeignKey('role_has_permission', this.tableRolesToPermissionRoleIdForeignKey);
        await queryRunner.dropForeignKey('role_has_permission', this.tableRolesToPermissionPermissionIdForeignKey);
    }
}
