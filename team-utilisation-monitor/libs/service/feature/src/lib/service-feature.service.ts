import { GetRecomendedTeamQuery } from './queries/impl/GetRecomendedTeam.query';
import { DeleteProjectCommand } from './commands/impl/DeleteProject.command';
import { GetTeamsOnProjectQuery } from './queries/impl/GetTeamsOnProject.query';
import { CompleteProjectCommand } from './commands/impl/CompleteProject.command';
import { GetCompanyUtilizationQuery } from './queries/impl/GetCompanyUtilization.query';
import { GetMonthlyUtilizationQuery } from './queries/impl/GetMonthlyUtilization.query';
import { GetAvailableTeamsQuery } from './queries/impl/GetAvailableTeams.query';
import { CalculateUtilizationCommand } from './commands/impl/CalculateUtilization.command';
import { AssignHoursCommand } from './commands/impl/AssignHours.command';
import { GetUserStatsQuery } from './queries/impl/GetUserStats.query';
import { GetUserSkillsQuery } from './queries/impl/GetUsersSkills.query';
import { UpdateUserSkillCommand } from './commands/impl/UpdateUserSkill.command';
import { GetAllocatedProjectsQuery } from './queries/impl/getAllocatedProjects.query';
import { GetAllocatedTeamsQuery } from './queries/impl/getAllocatedTeams.query';
import { UpdateProfileCommand } from './commands/impl/UpdateProfile.command';
import { GetSkillsQuery } from './queries/impl/GetSkills.query';
import { DeleteEmployeeCommand } from './commands/impl/DeleteEmployee.command';
import { DeleteTeamMemberCommand } from './commands/impl/DeleteTeamMember.command';
import { GetTeamMembersQuery } from './queries/impl/getTeamMembers.query';
import { AddTeamMemberCommand } from './commands/impl/addTeamMember.command';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Company } from '@prisma/client';
import { TeamEntity, UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { ApproveRequestVEmailCommand } from './commands/impl/approve-request-v-email.command';
import { CreateAdminCommand } from './commands/impl/create-admin.command';
import { CreateCompanyCommand } from './commands/impl/create-company.command';
import { CreateInviteCodeCommand } from './commands/impl/create-invite-code.command';
import { CreateProjectCommand } from './commands/impl/create-project.command';
import { CreateTeamCommand } from './commands/impl/create-team.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetAllEmployeesOfCompany } from './queries/impl/get-all-employees-of-company.query';
import { GetNumberOfTeamsOfCompany } from './queries/impl/get-number-of-teams-of-company.query';
import { GetAllMembersOfTeam } from './queries/impl/get-all-members-of-team.query'
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
import { AssignProjectToTeamCommand } from './commands/impl/assign-project-to-team.command';
import { AssignProjectToTeamVNamesCommand } from './commands/impl/asign-project-to-team-vname.command';
import { GetAllTeamsWorkingOnProjectCommand } from './queries/impl/get-all-teams-working-on-project.query';
import { GetAllProjectsOfTeamsQuery } from './queries/impl/get-all-projects-of-teams.query';
import { GetUtilizedEmployeesQuery } from './queries/impl/GetUnderUtilizedEmployees.query';
import { FunctionsService } from './functions/functions.service';
import { SetTokenCommand } from './commands/impl/set-token.command';
import { VerifyTokenCommand } from './commands/impl/verify-token.command';
import { DeleteTeamCommand } from './commands/impl/DeleteTeam.command';
import { GetAllTeamsOfACompany } from './queries/impl/get-all-teams-of-company.query';
import { RemoveSkillCommand } from './commands/impl/remove-skill.command';
import { AddPositionCommand } from './commands/impl/AddPosition.command';
import { GetAllPositionsOfCompanyCommand } from './queries/impl/get-all-positions-of-company.query';

@Injectable()
export class ServiceFeatureService {

    constructor(private readonly queryBus:QueryBus,private readonly commandBus:CommandBus,private readonly functions:FunctionsService){}

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

    async getAllProjectsAndTeamsOfCompany(companyName:string,contentType:number):Promise<any>
    {
        return this.queryBus.execute(new GetAllProjectsOrTeamsOfCompany(companyName,contentType));
    }

    async getNumberOfTeamsOfCompany(companyName:string):Promise<any>
    {
        return this.queryBus.execute(new GetNumberOfTeamsOfCompany(companyName));
    }

    async getAllMembersOfTeam(teamName:string):Promise<any>
    {
        return this.queryBus.execute(new GetAllMembersOfTeam(teamName));
    }

    async GetInviteCode(companyName:string):Promise<any>
    {
      return this.queryBus.execute(new getInviteCode(companyName));
    }

    async AddTeamMember(teamName:string,employeeEmail:string)
    {
      return this.commandBus.execute(new AddTeamMemberCommand(teamName,employeeEmail));
    }

    async GetTeamMembers(teamName:string):Promise<any>
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

    async GetSkills():Promise<any>
    {
      return this.queryBus.execute(new GetSkillsQuery);
    }

    async UpdateProfile(Email:string,Name:string,Surname:string)
    {
      return this.commandBus.execute(new UpdateProfileCommand(Email,Name,Surname));
    }

    async AssignProjectToTeamServ(team_id:number,project_id:number):Promise<string>
    {
      return this.commandBus.execute(new AssignProjectToTeamCommand(team_id,project_id));
    }

    async AssignProjectToTeamVName(team_name:string,project_name:string):Promise<string>{

      return this.commandBus.execute(new AssignProjectToTeamVNamesCommand(project_name,team_name))
    }

    async GetAllTeamsWorkingOnProjectServ(project_name:string):Promise<any>
    {
      return this.queryBus.execute(new GetAllTeamsWorkingOnProjectCommand(project_name));
    }

    async GetAllProjectsOfATeamServ(team_name:string):Promise<any>
    {
      return this.queryBus.execute(new GetAllProjectsOfTeamsQuery(team_name));
    }

    async GetUnderUtilizedEmps(cName:string):Promise<any>
    {
      return this.queryBus.execute(new GetUtilizedEmployeesQuery(cName))
    }

    async GetAllocatedTeams(UserEmail:string):Promise<any>
    {
      return this.queryBus.execute(new GetAllocatedTeamsQuery(UserEmail))
    }

    async GetAllocatedProjects(UserEmail:string):Promise<any>
    {
      return this.queryBus.execute(new GetAllocatedProjectsQuery(UserEmail));
    }

    async UpdateUserSkill(UserEmail:string,skillName:string)
    {
      return this.commandBus.execute(new UpdateUserSkillCommand(UserEmail,skillName))
    }

    async GetUserSkills(UserEmail:string)
    {
      return this.queryBus.execute(new GetUserSkillsQuery(UserEmail));
    }

    async GetUserStats(UserEmail:string)
    {
      return this.queryBus.execute(new GetUserStatsQuery(UserEmail));
    }

    async getAllTeamsOfACompanyService(companyName:string):Promise<TeamEntity[]>
    {
      return this.queryBus.execute(new GetAllTeamsOfACompany(companyName));
    }

    async AssignHours(UserEmail:string,Hours:number)
    {
      return this.commandBus.execute(new AssignHoursCommand(UserEmail,Hours));
    }

    async CalculateUtilization(projectName:string):Promise<string>
    {
      return this.commandBus.execute(new CalculateUtilizationCommand(projectName));
    }

    async CalculateUtilisationTWO(companyName:string):Promise<string>
    {
      return this.functions.Tree("The Car show");
    }

    async AssignWeeklyHoursToEmployee(email:string,weeklyHours:number):Promise<string>
    {
      return this.commandBus.execute(new AssignHoursCommand(email,weeklyHours));
    }

    async GetAvailableTeams(projectName:string)
    {
      return this.queryBus.execute(new GetAvailableTeamsQuery(projectName))
    }

    async GetMonthlyUtilization(Email:string)
    {
      return this.queryBus.execute(new GetMonthlyUtilizationQuery(Email))
    }

    async GetCompanyUtilization()
    {
      return this.queryBus.execute(new GetCompanyUtilizationQuery);
    }

    async CompleteProject(projectName:string)
    {
      return this.commandBus.execute(new CompleteProjectCommand(projectName))
    }

    async DeleteSkill(skillName:string):Promise<boolean>
    {
      return this.commandBus.execute(new RemoveSkillCommand(skillName));
    }

    async DeleteProject(projectName:string)
    {
      return this.commandBus.execute(new DeleteProjectCommand(projectName))
    }

    async GetTeamsOnProject(projectName:string)
    {
      return this.queryBus.execute(new GetTeamsOnProjectQuery(projectName));
    }

    async setToken(email:string,token:string):Promise<boolean>
    {
      return this.commandBus.execute(new SetTokenCommand(token,email));
    }

    async verifyToken(email:string,token:string):Promise<boolean>
    {
      return this.commandBus.execute(new VerifyTokenCommand(email,token));
    }

    async DeleteTeam(teamName:string)
    {
      return this.commandBus.execute(new DeleteTeamCommand(teamName));
    }

    async GetRecomendedTeam(numPeople:number,skillName:string)
    {
      return this.queryBus.execute(new GetRecomendedTeamQuery(numPeople,skillName))
    }

    async AddPosition(position_name:string)
    {
      return this.commandBus.execute(new AddPositionCommand(position_name));
    }

    async GetAllPositions()
    {
      return this.queryBus.execute(new GetAllPositionsOfCompanyCommand());
    }
}
