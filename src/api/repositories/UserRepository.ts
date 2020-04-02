import { EntityRepository, Repository } from 'typeorm';

import { Users } from '../models/Users';

@EntityRepository(Users)
export class UserRepository extends Repository<Users>  {

}
