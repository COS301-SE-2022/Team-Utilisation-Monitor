import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Role } from '@prisma/client';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { CreateAdminCommand } from './commands/impl/create-admin.command';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { CreateInviteCodeCommand } from './commands/impl/create-invite-code.command';
import { CreatePersonCommand } from './commands/impl/create-person.command';
import { CreateProjectCommand } from './commands/impl/create-project.command';
import { CreateTeamCommand } from './commands/impl/create-team.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
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

    async createInviteCode(companyName:string):Promise<any>
    {
        return this.commandBus.execute(new CreateInviteCodeCommand(companyName));
    }

    async createCompany(companyName:string):Promise<any>
    {
        return this.commandBus.execute(new CreateCompanyCommand(companyName));
    }

    async createProject(projectName:string,companyName:string,teamName:string,manHours:number):Promise<any>
    {
        return this.commandBus.execute(new CreateProjectCommand(projectName,teamName,companyName,manHours));
    }

    async createTeam(teamName:string,companyName:string):Promise<any>
    {
        return this.commandBus.execute(new CreateTeamCommand(teamName,companyName))
    }

    async createAdmin(name:string,surname:string,email:string,password:string,companyName:string)
    {
        return this.commandBus.execute(new CreateAdminCommand(name,surname,email,password,companyName));
    }

    async createUser(name:string,surname:string,email:string,password:string,invite_code:string)
    {
        return this.commandBus.execute(new CreateUserCommand(name,surname,email,password,invite_code));
    }

    /**
     * public readonly name:string,
        public readonly surname:string,
        public readonly email:string,
        public readonly password:string,
        public readonly companyName:string
     */

    

    
}
