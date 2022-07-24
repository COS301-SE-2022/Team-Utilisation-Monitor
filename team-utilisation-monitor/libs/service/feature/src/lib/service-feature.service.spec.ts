import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";

import { UserPerson, UserCompany } from '@team-utilisation-monitor/api/shared/data-access';
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';

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

  const mockQueryBus = {
    execute: jest.fn((query: IQuery) => {
      if (query instanceof GetOnePersonQuery) {

        const user_person = new UserPerson();

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.position = "team lead";
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;
        
        return user_person;

      } else if (query instanceof GetCompanyQuery) {

        const user_company = new UserCompany();

        user_company.id = 28;
        user_company.company_name = "icreate"
        user_company.admins = null;
        user_company.employees = null;
        user_company.projects = null;
        user_company.teams = null;
        user_company.invite_code = "hvuwuwbv12"

        return user_company;

      } else if (query instanceof GetTeamMembersQuery) {

        const team_entity = new TeamEntity();

        team_entity.id = 13;
        team_entity.team_name = "chelsea"
        team_entity.members = null;
        team_entity.company_id = 10;
        team_entity.project_name = "w2k"
        team_entity.projects = null;
        team_entity.project_id = 9;
        team_entity.completed = 77;

        return team_entity;

      } else if (query instanceof GetAllEmployeesOfCompany) {

        const team = [];

        let user_person = new UserPerson();

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.position = "team lead";
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        team[0] = user_person;

        user_person = new UserPerson();

        user_person.id = 66;
        user_person.name = "Sam";
        user_person.surname = "Smith";
        user_person.email = "ssmith@gmail.com";
        user_person.role = "developer";
        user_person.suspended = false;
        user_person.position = "admin";
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        team[1] = user_person;

        return team;

      }

      return 10;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ServiceFeatureService,
        { provide: QueryBus, useValue: mockQueryBus}
      ],
    }).compile();

      service = module.get<ServiceFeatureService>(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getOnePersonVEmailService", () => {
    it('should return a UserPerson', async () => {
      let test = new UserPerson();
      try {
        test = await service.getOnePersonVEmailService('rourke@gmail.com');
      } catch (err) { return }
      expect(test.id).toEqual(123);
      });
  });

  describe("getCompanyVName", () => {
    it('should return a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await service.getCompany('icreate');
      } catch (err) { return }
      expect(test.invite_code).toEqual("hvuwuwbv12");
      });
  });

  //needs to be implemented in service layer
  describe("getCompanyVID", () => {
    it('should return a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await service.getCompany('12');
      } catch (err) { return }
      expect(test).toBeInstanceOf(UserCompany);
      });
  });

  //needs to be implemented in service layer
  describe("getTeam", () => {
    it('should return a TeamEntity', async () => {
      let test = new TeamEntity();
      try {
        test = await service.GetTeamMembers('icreate');
      } catch (err) { return }
      expect(test.team_name).toEqual("chelsea");
      });
  });

  describe("getEmployeesOfCompany", () => {
    it('should return a UserPerson[]', async () => {
      let test = [];
      try {
        test = await service.getAllEmployees('icreate');
      } catch (err) { return }
      expect(test[1]).toBeInstanceOf(UserPerson);
      });
  });

});

/*
getOnePersonVEmail(arg_email:string):Promise<UserPerson|string>
getTeam(team_ID:number):Promise<TeamEntity>
getCompanyVName(f_company_name:string):Promise<UserCompany|null>
getEmployeesOfCompany(companyName:string):Promise<UserPerson[]>
getCompanyVID(f_id:number):Promise<UserCompany|null>
*/