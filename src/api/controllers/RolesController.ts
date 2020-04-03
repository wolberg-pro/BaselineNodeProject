import {
    Authorized, Get, Put, JsonController, Param, QueryParams, Body
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { GetUsersQuery } from './requests/query/DeletedQuery';
import { Role } from '../models/Role';
import { RoleService } from '../services/RoleService';
import { UserService } from '../services/UserService';
import { RoleOrPermissionResponse } from './responses/RoleOrPermissionResponse';
import { BooleanResponse } from './responses/BooleanResponse';
@Authorized()
@JsonController('/roles')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class RolesController {

    constructor(
        private roleService: RoleService,
        private userService: UserService
    ) { }

    @Get('/')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'get all roles', isArray: true })
    public index(@QueryParams() query: GetUsersQuery): Promise<Role[]> {
        return this.roleService.find(query.show_deleted);
    }
    @Get('/find/id/:id')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'look up for role by ID' })
    public findById(@Param('id') id: number): Promise<Role> {
        return this.roleService.findOne(id);
    }
    @Get('/find/slug/:slug')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'look up for role by slug' })
    public findBySlug(@Param('slug') slug: string): Promise<Role> {
        return this.roleService.findOneBySlug(slug);
    }

    @Put('/id/:id')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'update role by ID' })
    public updateById(@Param('id') id: number, @Body() body: RoleOrPermissionResponse): Promise<Role> {
        return this.updateRole(id, body);
    }
    @Put('/slug/:slug')
    @Authorized('admin_app')
    @ResponseSchema(RoleOrPermissionResponse, { description: 'update role by slug' })
    public updateBySlug(@Param('slug') slug: string, @Body() body: RoleOrPermissionResponse): Promise<Role> {
        return this.updateRole(slug, body);
    }
    @Get('/:user_id/:slug')
    @Authorized()
    @ResponseSchema(BooleanResponse, { description: 'verify if user has role' })
    public async userHasRole(@Param('user_id') user_id: number, @Param('slug') slug: string): Promise<BooleanResponse> {
        const role = await this.roleService.findOneBySlug(slug);
        const user = await this.userService.findOne(user_id);
        const resultResponse = new BooleanResponse();
        resultResponse.result = false;
        if (user && role) {
            resultResponse.result = await this.roleService.userHasRole(user_id, slug);
        }
        return resultResponse;
    }
    /**
     * helper method for update the role
     * @param id
     * @param body
     * @return Promise<Role>
     */
    private updateRole(id: string | number, body: RoleOrPermissionResponse): Promise<Role> {
        return this.roleService.update(id, body);
    }

}
