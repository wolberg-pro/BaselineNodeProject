import {
    Authorized, Get, Put, JsonController, Param, QueryParams, Body
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { GetUsersQuery } from './requests/query/DeletedQuery';
import { Permission } from '../models/Permission';
import { PermissionService } from '../services/PermissionService';
import { RoleOrPermissionResponse } from './responses/RoleOrPermissionResponse';
@Authorized()
@JsonController('/permission')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class PermissionsController {

    constructor(
        private permissionService: PermissionService
    ) { }

    @Get('/')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'get all permissions', isArray: true })
    public index(@QueryParams() query: GetUsersQuery): Promise<Permission[]> {
        return this.permissionService.find(query.show_deleted);
    }
    @Get('/find/id/:id')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'look up for permission by ID' })
    public findById(@Param('id') id: number): Promise<Permission> {
        return this.permissionService.findOne(id);
    }
    @Get('/find/slug/:slug')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'look up for permission by slug' })
    public findBySlug(@Param('slug') slug: string): Promise<Permission> {
        return this.permissionService.findOneBySlug(slug);
    }

    @Put('/id/:id')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'update permission by ID' })
    public updateById(@Param('id') id: number, @Body() body: RoleOrPermissionResponse): Promise<Permission> {
        return this.updateEntity(id, body);
    }
    @Put('/slug/:slug')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'update permission by slug' })
    public updateBySlug(@Param('slug') slug: string, @Body() body: RoleOrPermissionResponse): Promise<Permission> {
        return this.updateEntity(slug, body);
    }
    /**
     * helper method for update the entity
     * @param id
     * @param body
     * @return Promise<Role>
     */
    private updateEntity(id: string | number, body: RoleOrPermissionResponse): Promise<Permission> {
        return this.permissionService.update(id, body);
    }

}
