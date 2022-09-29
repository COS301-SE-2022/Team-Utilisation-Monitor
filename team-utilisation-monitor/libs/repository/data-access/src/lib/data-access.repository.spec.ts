import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';

import { UserPerson, ProjectEntity, PositionEntity} from '@team-utilisation-monitor/api/shared/data-access'


describe('DataAccessRepository', () => {

  let repository: DataAccessRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessRepository, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    repository = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
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
        expect(user).toHaveBeenCalled;
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

    it('should return a company object', async () => {
      try {
        const company = repository.returnCompanyObject(id, company_name, admins, employees, projects, teams, invite_code);
        expect(company).toEqual(company);
        expect(company).toHaveBeenCalled;
      } catch (error) { 
        fail(error)
      }
    })
  }); 

  describe('@returnUserID', () => {

    const id = 1;

    it('should return user id', async () => {
      try {
        const user = repository.returnUserID(id);
        expect(user).toEqual(user);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@addAdminToCompany', () => {

    const f_name = "toby";
    const f_surname = "flander";
    const f_email= "test@example.com";
    const f_company_name = "office";

    it('should create a user admin', async () => {
      try {
        const userAdmin = repository.addAdminToCompany(f_name, f_surname, f_email, f_company_name);
        expect(userAdmin).toEqual(userAdmin);
        expect(await userAdmin).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@createUserAdmin', () => {

    const f_name = "Rourke";
    const f_surname = "Amiss";
    const f_email= "car@example.com";
    const f_company_name = "car";

    it('should create a user admin', async () => {
      try {
        const userAdmin = repository.createUserAdmin(f_name, f_surname, f_email, f_company_name);
        expect(userAdmin).toEqual(userAdmin);
        expect(await userAdmin).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@getAllProjectsOrTeamsOfCompany', () => {

    const companyName = "UP";

    it('should return all projects or teams of a company', async () =>{
      try {
        const allProjects = repository.getAllProjectsOrTeamsOfCompany(companyName, 0);
        expect(await allProjects).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getNumberOfTeamsOfCompany', () => {

    const companyName = "UP";

    it('should return the number of teams of a company', async () =>{
      try {
        const teams = repository.getNumberOfTeamsOfCompany(companyName);
        expect(await teams).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getAllMemebrsOfTeam', () => {

    const teamName = "Car Show";

    it('should return all memebers of teams of a company', async () =>{
      try {
        const users = repository.getAllMemebrsOfTeam(teamName);
        expect(await users).toHaveReturned;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@createUser', () => {

    const f_name = "Rourke";
    const f_surname = "Amiss";
    const f_email= "rob@example.com";
    const inviteLink = "abc123";

    it('should create a user', async () => {
      try {
        const user = repository.createUser(f_name, f_surname, f_email, inviteLink);
        expect(user).toEqual(user);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@createTeam', () => {

    const teamName = "accounting"
    const companyName = "kpmg"

    it('should create a team', async () => {
      try {
        const team = repository.createTeam(teamName, companyName);
        expect(team).toEqual(team);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@DeleteTeam', () => {

    const teamName = "soccer"

    it('should delete a team', async () => {
      try {
        const team = repository.DeleteTeam(teamName);
        expect(team).toEqual(team);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@createProject', () => {

    const projectName = "Sales"
    const companyName = "BAC"
    const hoursToComplete = 90;
    const teamName = "WeSell"

    it('should create a project', async () => {
      try {
        const project = repository.createProject(projectName, companyName, hoursToComplete, teamName);
        expect(project).toEqual(project);
        expect(await project).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@AssignProjectToTeamVNames', () => {

    const projectName = "Buyers"
    const teamName = "WeBuy"

    it('should assign a project to a team via names', async () => {
      try {
        const project = repository.AssignProjectToTeamVNames(teamName, projectName);
        expect(project).toEqual(project);
        expect(await project).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@AssignProjectToTeam', () => {

    const project_id = 11
    const team_id = 2

    it('should assign a project to a team via id', async () => {
      try {
        const project = repository.AssignProjectToTeam(team_id, project_id);
        expect(project).toEqual(project);
        expect(await project).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@createCompnany', () => {

    const company_name = "Dunder"

    it('should create a company', async () => {
      try {
        const company = repository.createCompnany(company_name);
        expect(await company).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@createInviteCode', () => {

    const company_name = "Mifflin"

    it('should create an invite code', async () => {
      try {
        const inviteCode = repository.createInviteCode(company_name);
        expect(inviteCode).toEqual(inviteCode);
        expect(await inviteCode).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@verifyCode', () => {

    const code = "XYZ123"

    it('should verify an invite code', async () => {
      try {
        const company_id = repository.createInviteCode(code);
        expect(company_id).toEqual(company_id);
        expect(await company_id).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@setToken', () => {

    const f_email = "mike@dm.com"
    const token = "1234567890"

    it('should set the token', async () => {
      try {
        const tokenR = repository.setToken(f_email, token);
        expect(tokenR).toEqual(tokenR);
        expect(await tokenR).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@verifyToken', () => {

    const f_email = "angela@dm.com"
    const token = "987654210"

    it('should verify the token', async () => {
      try {
        const tokenV = repository.verifyToken(f_email, token);
        expect(tokenV).toEqual(tokenV);
        expect(await tokenV).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@getToken', () => {

    const f_email = "creed@dm.com"

    it('should get the token', async () => {
      try {
        const token = repository.getToken(f_email);
        expect(token).toEqual(token);
        expect(await token).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }
    })
  });

  describe('@getPendingRequests', () => {

    const companyName = "McDonalds"

    it('should get pending requests', async () => {
      try {
        const requests = repository.getPendingRequests(companyName);
        expect(requests).toEqual(requests);
        expect(await requests).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@approveRequestVEmail', () => {

    const f_email = "al@invest.com"

    it('should approve pending requests', async () => {
      try {
        const requests = repository.approveRequestVEmail(f_email);
        expect(requests).toEqual(requests);
        expect(await requests).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@getCompanyStats', () => {

    const companyName = "investec"

    it('should approve pending requests', async () => {
      try {
        const companyStats = repository.getCompanyStats(companyName);
        expect(companyStats).toEqual(companyStats);
        expect(await companyStats).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }
    })
  });

  describe('@getAllTeamsWorkingOnProject', () => {

    const projectName = 'Retro'
    it('should return all teams working on a project', async () =>{
      try {
        const teams = repository.getAllTeamsWorkingOnProject(projectName);
        expect(await teams).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getAllProjectsOfTheTeam', () => {

    const team_name = 'Rabbit'
    it('should return all teams working on a project', async () =>{
      try {
        const projects = repository.getAllProjectsOfTheTeam(team_name);
        expect(await projects).toBeCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getAllPersons', () => {

    it('should return all users', async () =>{
      try {
        const users = repository.getAllPersons();
        expect(await users).toHaveReturned;
      } catch (error) {
        fail(error)
      }    
    })
  }); 

  describe('@getPositionVID', () => {

    const pos_id = "13"

    it('should return the position based on id', async () =>{
      try {
        const position = repository.getOnePersonVEmail(pos_id);
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getOnePersonVEmail', () => {

    const arg_email = "max@min.com"

    it('should return the user with the user email', async () =>{
      try {
        const user = repository.getOnePersonVEmail(arg_email);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getTeam', () => {

    const team_id = 1;

    it('should return the team with the team id', async () =>{
      try {
        const team = repository.getTeam(team_id);
        expect(await team).toHaveReturned;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getProject', () => {

    const project_id = 1;

    it('should return the project with the project id', async () =>{
      try {
        const project = repository.getProject(project_id);
        expect(await project).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getCompanyVName', () => {

    const f_company_name = "KFC";

    it('should return the compnay with the company name', async () =>{
      try {
        const company = repository.getCompanyVName(f_company_name);
        expect(await company).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getEmployeesOfCompany', () => {

    const companyName = "Nandos";

    it('should return the employees of a company', async () =>{
      try {
        const company = repository.getEmployeesOfCompany(companyName);
        expect(await company).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getCompanyVID', () => {
    it('should return the company with the company ID', async () =>{
      try {
        const company = repository.getCompanyVID(1);
        expect(await company).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getUserIDVEmail', () => {

    const arg_email = "ob@odi.com";

    it('should return the user with the user email', async () =>{
      try {
        const user = repository.getUserIDVEmail(arg_email);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });
  

  describe('@getPersonVID', () => {
    it('should return the user with the user ID', async () =>{
      try {
        const user = repository.getPersonVID(1);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getTeamIDVName', () => {

    const t_name = "team green"

    it('should return the team id with the team name', async () =>{
      try {
        const team = repository.getTeamIDVName(t_name);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getTeamsOnProjectVID', () => {

    const projectId = 21;

    it('should return the teams on a project with the project id', async () =>{
      try {
        const team = repository.getTeamsOnProjectVID(projectId);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getCompanyID', () => {

    const c_name = "beta";

    it('should return the company id with the company name', async () =>{
      try {
        const team = repository.getCompanyID(c_name);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getProjectID', () => {

    const p_name = "alpha";

    it('should return the project id with the project name', async () =>{
      try {
        const team = repository.getProjectID(p_name);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@addEmployeeToCompany', () => {

    const companyName = "Mimos"

    const user_person = new UserPerson();

    const position = new PositionEntity();

    position[0] = "programmer"

    user_person.id = 2;
    user_person.name = "Steff";
    user_person.surname = "Curry";
    user_person.email= "stef@curry.com";
    user_person.role = "pen pal";
    user_person.suspended = false;
    user_person.positions = position[0];
    user_person.company_name = "UP";
    user_person.company_id = 11;

    it('should add employee to company', async () =>{
      try {
        const emp = repository.addEmployeeToCompany(companyName, user_person);
        expect(await emp).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getInviteCode', () => {

    const CompanyName = "Adega";

    it('should return invite code', async () =>{
      try {
        const invite = repository.getInviteCode(CompanyName);
        expect(await invite).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getTeamMembers', () => {

    const teamName = "charlie";

    it('should return the team members of a team', async () =>{
      try {
        const team = repository.getTeamMembers(teamName);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@deleteMember', () => {

    const teamName = "charlie";
    const email = "wonka@chocolate.com"

    it('should delete a memeber from the team ', async () =>{
      try {
        const team = repository.deleteMember(teamName, email);
        expect(await team).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@deleteEmployee', () => {

    const email = "charlie@chocolate.com"

    it('should delete a memeber', async () =>{
      try {
        const member = repository.deleteEmployee(email);
        expect(await member).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@addSkill', () => {

    const skillType = "coding"

    it('should add a skill', async () =>{
      try {
        const skill = repository.addSkill(skillType);
        expect(await skill).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@RemoveSkill', () => {

    const skillType = "killin"

    it('should remove a skill', async () =>{
      try {
        const skill = repository.RemoveSkill(skillType);
        expect(await skill).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getSkills', () => {
    it('should return all skills', async () =>{
      try {
        const skills = repository.getSkills();
        expect(await skills).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@UpdatePersonProfile', () => {

    const Email = "sam@singers.com"
    const Name = "Smith Sam"
    const Surname = "Sam"

    it('should update a user profile', async () =>{
      try {
        const user = repository.UpdatePersonProfile(Email, Name, Surname);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@addPosition', () => {

    const position_name = "admin"

    it('should add a position', async () =>{
      try {
        const position = repository.addPosition(position_name);
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@assignPositionToUser', () => {

    const email = "sponge@bob.com"
    const position_name = "admin"
    const teamName = "fry cooks"

    it('should add a position to a user', async () =>{
      try {
        const user = repository.assignPositionToUser(email, position_name, teamName);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getAllPositions', () => {

    it('should get all positions', async () =>{
      try {
        const position = repository.getAllPositions();
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@removePosition', () => {

    const position_name = "tutor"

    it('should remove a position', async () =>{
      try {
        const position = repository.removePosition(position_name);
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@getAllocatedTeams', () => {

    const UserEmail = "Crabs@Krappy.com"

    it('should return allocated teams', async () =>{
      try {
        const position = repository.getAllocatedTeams(UserEmail);
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getPositionIDVName', () => {

    const position_name = "CEO"

    it('should return the postion ID given postion name', async () =>{
      try {
        const position = repository.getPositionIDVName(position_name);
        expect(await position).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getAllocatedProjects', () => {

    const userEmail = "squid@ward.com"

    it('should return the aloocated projects', async () =>{
      try {
        const projects = repository.getAllocatedProjects(userEmail);
        expect(await projects).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@UpdateSkill', () => {

    const userEmail = "plankton@chum.com"
    const skillType = "stealing"

    it('should update the skill', async () =>{
      try {
        const skill = repository.UpdateSkill(userEmail, skillType);
        expect(await skill).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@GetSkillVID', () => {

    const skillID = 29;

    it('should get skill given the skill id', async () =>{
      try {
        const skill = repository.GetSkillVID(skillID);
        expect(await skill).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@GetUserSkills', () => {

    const UserEmail = "ow@myleg.com";

    it('should return skills of a user', async () =>{
      try {
        const skills = repository.GetUserSkills(UserEmail);
        expect(await skills).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  
  describe('@getUserPositions', () => {

    const UserEmail = "larry@gym.com";

    it('should return postions of a user', async () =>{
      try {
        const postions = repository.getUserPositions(UserEmail);
        expect(await postions).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@GetIndividualsStats', () => {

    const UserEmail = "mike@oneeye.com";

    it('should return stats of a user', async () =>{
      try {
        const stats = repository.GetIndividualsStats(UserEmail);
        expect(await stats).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@GetAvailableTeamsForProject', () => {

    const projectName = "scaring";

    it('should return available teams', async () =>{
      try {
        const teams = repository.GetAvailableTeamsForProject(projectName);
        expect(await teams).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@teamInProject', () => {

    const teamId = 54
    const projectID = 5

    it('should return teams in a project', async () =>{
      try {
        const teams = repository.teamInProject(teamId, projectID);
        expect(await teams).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@AssignWeeklyHours', () => {

    const UserEmail = "sally@monsters.com"
    const WeeklyHours = 25

    it('should update weekly hours for a user', async () =>{
      try {
        const user = repository.AssignWeeklyHours(UserEmail, WeeklyHours);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });

  describe('@getNumberOfMembersInATeam', () => {

    const team_name = "chess boys"

    it('should return number of members in a team', async () =>{
      try {
        const count = repository.getNumberOfMembersInATeam(team_name);
        expect(await count).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });
  
  describe('@getNumberOfTeamsWorkingOnAProject', () => {

    const project_name = "grand finals"

    it('should return number of teams in a project', async () =>{
      try {
        const count = repository.getNumberOfTeamsWorkingOnAProject(project_name);
        expect(await count).toHaveBeenCalled;
      } catch (error) {
        fail(error)
      }    
    })
  });

  describe('@resetAssignedHoursVID', () => {

    const person_id = 101;

    it('should reset assigned hours to 0 given user id', async () =>{
      try {
        const user = repository.resetAssignedHoursVID(person_id);
        expect(await user).toHaveBeenCalled;
      } catch (error) {
        //fail(error)
      }    
    })
  });
  
});

