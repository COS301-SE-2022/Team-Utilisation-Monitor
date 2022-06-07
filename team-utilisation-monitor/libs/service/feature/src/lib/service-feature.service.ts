import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Role } from '@prisma/client';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { CreateInviteCodeCommand } from './commands/impl/create-invite-code.command';
import { CreatePersonCommand } from './commands/impl/create-person.command';
import { GetAllPersonsQuery } from './queries/impl/get-all-persons.query';
import { GetOnePersonQuery } from './queries/impl/get-one-person.query';
import { Login } from './queries/impl/login.query';

@Injectable()
export class ServiceFeatureService {

    constructor(private readonly queryBus:QueryBus,private readonly commandBus:CommandBus){}

    async getAllUserPerson():Promise<UserPerson>
    {
        return this.queryBus.execute(new GetAllPersonsQuery);
    }

    async getOnePersonVEmailService(email:string):Promise<UserPerson|null>
    {
        return this.queryBus.execute(new GetOnePersonQuery(email));
    }

    async login(email:string, password:string):Promise<UserPerson>
    {
        return this.queryBus.execute(new Login(email,password));
    }

    async signup(name:string,surname:string,email:string,password:string,role:Role,suspended:boolean,company_name:string)
    {
        return this.commandBus.execute(new CreatePersonCommand(name,surname,email,password,role,suspended,company_name));
    }

    async createInviteCode(companyName:string)
    {
        return this.commandBus.execute(new CreateInviteCodeCommand(companyName));
    }

    async createCompany(companyName:string)
    {
        return this.commandBus.execute(new CreateCompanyCommand(companyName));
    }

    

    
}
