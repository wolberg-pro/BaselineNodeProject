/**
 * events
 * ---------------------
 * Define all your possible custom events here.
 */
export const events = {
    user: {
        created: 'onUserCreate',
        updated: 'onUserUpdate',
        deleted: 'onUserDelete',
    },
    role: {
        created: 'onRoleCreate',
        updated: 'onRoleUpdate',
        deleted: 'onRoleDelete',
    },
    permission: {
        created: 'onPermissionCreate',
        updated: 'onPermissionUpdate',
        deleted: 'onPermissionDelete',
    },
};
