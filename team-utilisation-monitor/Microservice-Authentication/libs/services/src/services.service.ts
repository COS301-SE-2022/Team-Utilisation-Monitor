import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthAdminEntity } from 'shared/Entities/api-auth-admin.entity';
import { RegisterAdminCommand } from './commands/impl/register-admin.command';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { Login } from './queries/impl/login.query';

@Injectable()
export class ServicesService {

    constructor(private readonly queryBus:QueryBus,private readonly commandBus:CommandBus){}

    async registerAdminServ(username:string,password:string):Promise<AuthAdminEntity>
    {
        return this.commandBus.execute(new RegisterAdminCommand(username,password));
    }

    async registerUserServ(username:string,password:string):Promise<AuthAdminEntity>
    {   
        return this.commandBus.execute(new RegisterUserCommand(username,password));
    }

    async LoginServ(username:string,password:string):Promise<AuthAdminEntity>
    {
        return this.queryBus.execute(new Login(username,password));
    }


}
