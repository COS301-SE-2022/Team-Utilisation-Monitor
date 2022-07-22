import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";

import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { Company } from '@prisma/client';

import { UpdateProfileCommand } from './commands/impl/UpdateProfile.command';
import { GetSkillsQuery } from './queries/impl/GetSkills.query';
import { DeleteEmployeeCommand } from './commands/impl/DeleteEmployee.command';
import { DeleteTeamMemberCommand } from './commands/impl/DeleteTeamMember.command';
import { GetTeamMembersQuery } from './queries/impl/getTeamMembers.query';
import { AddTeamMemberCommand } from './commands/impl/addTeamMember.command';
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

describe('ServiceFeatureService', () => {
  let service: ServiceFeatureService;

  const mockServiceRepository = {
    execute: jest.fn((query: IQuery) => {

      const user_person = new UserPerson();

      user_person.id = 123;
      user_person.name = "Rourke";
      user_person.surname = "Amiss";
      user_person.email =email;
      user_person.role =role;
      user_person.suspended =suspended;
      user_person.position =position;
      user_person.company_name =company;
      user_person.project_name =project;
      user_person.team_name =team;
      user_person.company_id =company_id;
      user_person.project_id =project_id;
      user_person.team_id = team_id;

    })
  }



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ServiceFeatureService
      ],
    })
      // .overrideProvider(ServiceFeatureService)
      // .useValue(mockServiceRepository)
      .compile();

      service = module.get<ServiceFeatureService>(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', async () => {
    expect (await service.getUserIDVEmail('foo@bar.com')).toEqual(UserPerson)

    ;
  });

});

/*
getOnePersonVEmail(arg_email:string):Promise<UserPerson|string>
getTeam(team_ID:number):Promise<TeamEntity>
getCompanyVName(f_company_name:string):Promise<UserCompany|null>
getEmployeesOfCompany(companyName:string):Promise<UserPerson[]>
getCompanyVID(f_id:number):Promise<UserCompany|null>
*/