import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';

import { UserPerson, ProjectEntity, UserCompany, InviteCodeEntity, CompanyStatsEntity ,Skill, UserStatsEntity, CompanyUtilization, PositionEntity} from '@team-utilisation-monitor/api/shared/data-access'


describe('DataAccessRepository', () => {

  let repository: DataAccessRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessRepository, PrismaService],
    }).compile();

    repository = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('@returnObject', () => {
        
    const id = 1;
    const name = "Rourke";
    const surname = "Amiss";
    const email= "test@example.com";
    const role = "tester";
    const suspended = false;
    const position = "intern";
    const company_name = "UP";
    const company_id = 123;

    it('should return a user object', async () => {
      try {
        const user = repository.returnObject(id, name, surname, email, suspended, role, company_name, position, company_id);
        expect(user).toEqual(user);
        expect(user).toHaveReturned;
      } catch (error) { 
        fail(error)
      }
    })
  }); 

  describe('@returnCompanyObject', () => {

    const all_users = [];

    let user_person = new UserPerson();

    const position = new PositionEntity();

    position[0] = "admin"

    position[1] = "tester"

    user_person.id = 1;
    user_person.name = "Rourke";
    user_person.surname = "Amiss";
    user_person.email= "test@example.com";
    user_person.role = "tester";
    user_person.suspended = false;
    user_person.positions = position[0];
    user_person.company_name = "UP";
    user_person.company_id = 123;

    all_users[0] = user_person;

    user_person = new UserPerson();

    user_person.id = 66;
    user_person.name = "Sam";
    user_person.surname = "Smith";
    user_person.email = "ssmith@gmail.com";
    user_person.role = "developer";
    user_person.suspended = false;
    user_person.positions = position[1];
    user_person.company_name = "UP";
    user_person.company_id = 123;

    all_users[1] = user_person;

    const all_projects = [];

    const project_entity = new ProjectEntity();

    project_entity.id = 11;
    project_entity.project_name = "Master Chef";
    project_entity.ownwer_id = 1;
    project_entity.workers = null;
    project_entity.completed = false;
    project_entity.teams = null;
    project_entity.man_hours = 60;

    all_projects[0] = project_entity;
        
    const id = 1;
    const company_name = "Grand Tour";
    const admins = all_users[0];
    const employees = all_users[1];
    const projects = all_projects[0];
    const teams = null;
    const invite_code = "inv123";

    it('should return a company object', () => {
      try {
        const company = repository.returnCompanyObject(id, company_name, admins, employees, projects, teams, invite_code);
        expect(company).toEqual(company);
      } catch (error) { 
        fail(error)
      }
    })
  }); 

  
});
