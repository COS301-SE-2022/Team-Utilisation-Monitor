import { GetSkillsQuery } from './queries/impl/GetSkills.query';
import { DeleteEmployeeCommand } from './commands/impl/DeleteEmployee.command';
import { DeleteTeamMemberCommand } from './commands/impl/DeleteTeamMember.command';
import { GetTeamMembersQuery } from './queries/impl/getTeamMembers.query';
import { AddTeamMemberCommand } from './commands/impl/addTeamMember.command';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Company } from '@prisma/client';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { ApproveRequestVEmailCommand } from './commands/impl/approve-request-v-email.command';
import { CreateAdminCommand } from './commands/impl/create-admin.command';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { CreateInviteCodeCommand } from './commands/impl/create-invite-code.command';
import { CreateProjectCommand } from './commands/impl/create-project.command';
import { CreateTeamCommand } from './commands/impl/create-team.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetAllEmployeesOfCompany } from './queries/impl/get-all-employees-of-company.query';
import { GetAllPersonsQuery } from './queries/impl/get-all-persons.query';
import { GetAllProjectsOrTeamsOfCompany } from './queries/impl/get-all-projects-or-teams.query';
import { GetCompanyStats } from './queries/impl/get-company-stats.query';
import { GetOnePersonQuery } from './queries/impl/get-one-person.query';
import { GetPendingRequests } from './queries/impl/get-pending-requests.query';
import { GetUserIDQuery } from './queries/impl/get-user-id.query';
import { GetCompanyQuery } from './queries/impl/getCompany.query';
import { Login } from './queries/impl/login.query';
import { getInviteCode } from './queries/impl/getInviteCode.query';
import { AddSkillCommand } from './commands/impl/AddSkill.command';

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

    async getCompany(name: string):Promise<Company>
    {
      return this.queryBus.execute(new GetCompanyQuery(name));
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

    async createAdmin(name:string,surname:string,email:string,companyName:string)
    {
        return this.commandBus.execute(new CreateAdminCommand(name,surname,email,companyName));
    }

    async createUser(name:string,surname:string,email:string,invite_code:string)
    {
        return this.commandBus.execute(new CreateUserCommand(name,surname,email,invite_code));
    }

    async getPendingRequests(companyName:string):Promise<UserPerson>
    {
        return this.queryBus.execute(new GetPendingRequests(companyName));
    }

    async getUserIDVEmail(email:string):Promise<UserPerson>
    {
        return this.queryBus.execute(new GetUserIDQuery(email));
    }


    async approveRequestVEmail(email:string)
    {
        return this.commandBus.execute(new ApproveRequestVEmailCommand(email));
    }

    async getCompanyStats(companyName:string):Promise<any>
    {
        return this.queryBus.execute(new GetCompanyStats(companyName));
    }

    async getAllEmployees(companyName:string):Promise<any>
    {
        return this.queryBus.execute(new GetAllEmployeesOfCompany(companyName));
    }

    async getAllProjectsAndTeamsOfCompany(companyName:string,contentType:number)
    {
        return this.queryBus.execute(new GetAllProjectsOrTeamsOfCompany(companyName,contentType));
    }

    async GetInviteCode(companyName:string)
    {
      return this.queryBus.execute(new getInviteCode(companyName));
    }

    async AddTeamMember(teamName:string,employeeEmail:string)
    {
      return this.commandBus.execute(new AddTeamMemberCommand(teamName,employeeEmail));
    }

    async GetTeamMembers(teamName:string)
    {
      return this.queryBus.execute(new GetTeamMembersQuery(teamName));
    }

    async DeleteTeamMember(teamName:string,email:string)
    {
      return this.commandBus.execute(new DeleteTeamMemberCommand(teamName,email))
    }
    async DeleteEmployee(email:string)
    {
      return this.commandBus.execute(new DeleteEmployeeCommand(email));
    }

    async AddSkill(skillType:string)
    {
      return this.commandBus.execute(new AddSkillCommand(skillType));
    }

    async GetSkills()
    {
      return this.queryBus.execute(new GetSkillsQuery());
    }
}
