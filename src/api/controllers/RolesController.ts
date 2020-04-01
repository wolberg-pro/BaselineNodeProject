import {
    Authorized, Get, JsonController, Param, QueryParams
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {GetUsersQuery} from './requests/query/DeletedQuery';
import {Role} from '../models/Role';
import {RoleService} from '../services/RoleService';
@Authorized()
@JsonController('/roles')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {

    constructor(
        private roleService: RoleService
    ) { }

    @Get('/')
    @ResponseSchema(Role, {  description: 'get all roles' , isArray: true })
    public index(@QueryParams() query: GetUsersQuery): Promise<Role[]> {
        return this.roleService.find(query.show_deleted);
    }
    @Get('/find/id/:id')
    @ResponseSchema(Role, {  description: 'look up for role by ID' })
    public findById(@Param('id') id: number): Promise<Role> {
        return this.roleService.findOne(id);
    }
    @Get('/find/slug/:slug')
    @ResponseSchema(Role, { description: 'look up for role by slug' })
    public findBySlug(@Param('slug') slug: string): Promise<Role> {
        return this.roleService.findOneBySlug(slug);
    }
}
