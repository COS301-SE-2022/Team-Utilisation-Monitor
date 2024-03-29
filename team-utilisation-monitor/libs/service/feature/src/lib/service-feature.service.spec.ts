import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus, IQuery, QueryBus } from "@nestjs/cqrs";

import { FunctionsModule } from './functions/functions.module';

import { UserPerson, UserCompany } from '@team-utilisation-monitor/api/shared/data-access';
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { ProjectEntity } from '@team-utilisation-monitor/api/shared/data-access';

import { UserStatsEntity } from '@team-utilisation-monitor/api/shared/data-access'
import { CompanyStatsEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { Skill } from '@team-utilisation-monitor/api/shared/data-access';
import { PositionEntity } from '@team-utilisation-monitor/api/shared/data-access';

import { GetSkillsQuery } from './queries/impl/GetSkills.query';
import { GetUserSkillsQuery } from './queries/impl/GetUsersSkills.query';
import { GetTeamMembersQuery } from './queries/impl/getTeamMembers.query';
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
import { GetUserIDQuery } from './queries/impl/get-user-id.query';
import { GetCompanyQuery } from './queries/impl/getCompany.query';
import { getInviteCode } from './queries/impl/getInviteCode.query';
import { AddSkillCommand } from './commands/impl/AddSkill.command';
import { AssignHoursCommand } from './commands/impl/AssignHours.command';
import { GetTeamsOnProjectQuery } from './queries/impl/GetTeamsOnProject.query';
import { CompleteProjectCommand } from './commands/impl/CompleteProject.command';
import { GetAllocatedProjectsQuery } from './queries/impl/getAllocatedProjects.query';
import { GetAllocatedTeamsQuery } from './queries/impl/getAllocatedTeams.query';
import { GetAllTeamsWorkingOnProjectCommand } from './queries/impl/get-all-teams-working-on-project.query';
import { GetAllProjectsOfTeamsQuery } from './queries/impl/get-all-projects-of-teams.query';
import { GetUserStatsQuery } from './queries/impl/GetUserStats.query';
import { GetAllTeamsOfACompany } from './queries/impl/get-all-teams-of-company.query';
import { GetMonthlyUtilizationQuery } from './queries/impl/GetMonthlyUtilization.query';
import { GetRecomendedTeamQuery } from './queries/impl/GetRecomendedTeam.query';
import { GetPositionsOfUserQuery } from './queries/impl/get-positions-of-user.query';

describe('ServiceFeatureService', () => {

  let service: ServiceFeatureService;
  let createService: ServiceFeatureService;

  const mockQueryBus = {
    execute: jest.fn((query: IQuery) => {
      if (query instanceof GetOnePersonQuery) {

        const user_person = new UserPerson();

        const positions = new PositionEntity();

        positions[0] = "team lead";

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.approved = true;
        user_person.company_name = "icreatesoftware";
        user_person.utilisation = 9;
        user_person.positions = positions[0];
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

        const positions = new PositionEntity();

        positions[0] = "team lead";

        positions[1] = "admin";

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.positions = positions[0];
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
        user_person.positions = positions[1];
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        team[1] = user_person;

        return team;

      } else if (query instanceof GetAllPersonsQuery) {

        const all_users = [];

        let user_person = new UserPerson();

        const positions = new PositionEntity();

        positions[0] = "team lead";

        positions[1] = "admin";

        positions[2] = "senior";

        user_person.id = 123;
        user_person.name = "Rourke";
        user_person.surname = "Amiss";
        user_person.email = "rourke@gmail.com";
        user_person.role = "intern";
        user_person.suspended = false;
        user_person.positions = positions[0];
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        all_users[0] = user_person;

        user_person = new UserPerson();

        user_person.id = 66;
        user_person.name = "Sam";
        user_person.surname = "Smith";
        user_person.email = "ssmith@gmail.com";
        user_person.role = "developer";
        user_person.suspended = false;
        user_person.positions = positions[1];
        user_person.company_name = "icreatesoftware";
        user_person.project_name = "tum";
        user_person.team_name = "team";
        user_person.company_id = 2;
        user_person.project_id = 6;
        user_person.team_id = 21;

        all_users[1] = user_person;

        user_person = new UserPerson();

        user_person.id = 7;
        user_person.name = "james";
        user_person.surname = "bond";
        user_person.email = "fakeemail@gmail.com";
        user_person.role = "back-end";
        user_person.suspended = true;
        user_person.positions = positions[2];
        user_person.company_name = "MI6";
        user_person.project_name = "QSS";
        user_person.team_name = "00";
        user_person.company_id = 99;
        user_person.project_id = 62;
        user_person.team_id = 3;

        all_users[2] = user_person;

        return all_users;

      } else if (query instanceof GetCompanyStats) {

        const company_stats = new CompanyStatsEntity();

        company_stats.numProjects = 31;
        company_stats.numTeams = 17
        company_stats.numEmployees = 141;
        company_stats.numAdmins = 14;

        return company_stats;

      } else if (query instanceof GetNumberOfTeamsOfCompany) {
        if (query.companyName === 'icreate') {
          const num_teams = 15;
          return num_teams;
        }

      } else if (query instanceof GetSkillsQuery) {

        const all_skills = [];

        let skills = new Skill();

        skills.id = 0;
        skills.skill = 'c++';

        all_skills[0] = skills;

        skills = new Skill();

        skills.id = 1;
        skills.skill = 'java';

        all_skills[1] = skills;

        skills = new Skill();

        skills.id = 2;
        skills.skill = 'python';

        all_skills[2] = skills;

        return all_skills;
        
      } else if (query instanceof GetUserSkillsQuery) {
        if (query.UserEmail === 'rourke@gmail.com') {

          const all_skills = [];

          const skills = new Skill();

          skills.id = 0;
          skills.skill = 'eating';

          all_skills[0] = skills;

          return all_skills;
        }

      } else if (query instanceof GetAllocatedProjectsQuery) {
        if (query.email === 'rourke@gmail.com') {

          const all_projects = [];

          const project_entity = new ProjectEntity();

          project_entity.id = 983;
          project_entity.project_name = "Master Chef";
          project_entity.ownwer_id = 81;
          project_entity.workers = null;
          project_entity.completed = false;
          project_entity.teams = null;
          project_entity.man_hours = 60;

          all_projects[0] = project_entity;

          return all_projects;
        }
      
      } else if (query instanceof GetAllocatedTeamsQuery) {
        if (query.Email === 'rourke@gmail.com') {

          const all_teams = [];

          const team_entity = new TeamEntity();

          team_entity.id = 19;
          team_entity.team_name = "Liverpool"
          team_entity.members = null;
          team_entity.company_id = 17;
          team_entity.project_name = "premier league"
          team_entity.projects = null;
          team_entity.project_id = 5;
          team_entity.completed = 6;

          all_teams[0] = team_entity;

          return all_teams;
        }

      } else if (query instanceof GetTeamsOnProjectQuery) {
        if (query.projectName === 'UCL') {

          const all_teams = [];

          const team_entity = new TeamEntity();

          team_entity.id = 4;
          team_entity.team_name = "West Ham"
          team_entity.members = null;
          team_entity.company_id = 11;
          team_entity.project_name = query.projectName;
          team_entity.projects = null;
          team_entity.project_id = 5;
          team_entity.completed = 6;

          all_teams[0] = team_entity;

          return all_teams;
        }

      } else if (query instanceof GetUserIDQuery) {
        if (query.email === 'test@test.com') {

          const user_person = new UserPerson();

          const positions = new PositionEntity();
  
          positions[0] = "team lead";
  
          user_person.id = 129;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = query.email;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "icreatesoftware";
          user_person.utilisation = 9;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
          
          return user_person;

        }

      } else if (query instanceof GetAllProjectsOrTeamsOfCompany) {
        if (query.contentType === 0 ) {

          const all_projects = [];

          const project_entity = new ProjectEntity();

          project_entity.id = 72;
          project_entity.project_name = "Learner Chef";
          project_entity.ownwer_id = 81;
          project_entity.workers = null;
          project_entity.completed = false;
          project_entity.teams = null;
          project_entity.man_hours = 60;

          all_projects[0] = project_entity;

          return all_projects;

        } else if (query.contentType === 1 ) {

          const all_teams = [];

          const team_entity = new TeamEntity();

          team_entity.id = 8;
          team_entity.team_name = "East Ham"
          team_entity.members = null;
          team_entity.company_id = 11;
          team_entity.project_name = "UEFA";
          team_entity.projects = null;
          team_entity.project_id = 5;
          team_entity.completed = 6;

          all_teams[0] = team_entity;

          return all_teams;

        }

      } else if (query instanceof GetAllMembersOfTeam) {
        if (query.teamName === 'Man City' ) {
          
          const all_users = [];

          let user_person = new UserPerson();

          const positions = new PositionEntity();

          positions[0] = "team lead";

          positions[1] = "admin";

          positions[2] = "senior";

          user_person.id = 123;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = "rourke@gmail.com";
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.positions = positions[0];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "tum";
          user_person.team_name = query.teamName;
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;

          all_users[0] = user_person;

          user_person = new UserPerson();

          user_person.id = 66;
          user_person.name = "Sam";
          user_person.surname = "Smith";
          user_person.email = "ssmith@gmail.com";
          user_person.role = "developer";
          user_person.suspended = false;
          user_person.positions = positions[1];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "tum";
          user_person.team_name = query.teamName;
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;

          all_users[1] = user_person;

          user_person = new UserPerson();

          user_person.id = 7;
          user_person.name = "james";
          user_person.surname = "bond";
          user_person.email = "fakeemail@gmail.com";
          user_person.role = "back-end";
          user_person.suspended = true;
          user_person.positions = positions[2];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "QSS";
          user_person.team_name = query.teamName;
          user_person.company_id = 99;
          user_person.project_id = 62;
          user_person.team_id = 3;

          all_users[2] = user_person;

          return all_users;
        }

      } else if (query instanceof getInviteCode) {
        if (query.company === 'ABC') {

          const user_company = new UserCompany();

          user_company.id = 28;
          user_company.company_name = query.company;
          user_company.admins = null;
          user_company.employees = null;
          user_company.projects = null;
          user_company.teams = null;
          user_company.invite_code = "ABC123"
  
          return user_company;
        }

      } else if (query instanceof GetAllTeamsWorkingOnProjectCommand) {
        if (query.projectName === 'Capstone' ) {

          const all_teams = [];

          const team_entity = new TeamEntity();

          team_entity.id = 404;
          team_entity.team_name = "ICS"
          team_entity.members = null;
          team_entity.company_id = 15;
          team_entity.project_name = "UP";
          team_entity.projects = null;
          team_entity.project_id = 401;
          team_entity.completed = 0;

          all_teams[0] = team_entity;

          return all_teams;
        }

      } else if (query instanceof GetAllProjectsOfTeamsQuery) {
        if (query.teamName === 'ICS' ) {

          const all_projects = [];

          const project_entity = new ProjectEntity();

          project_entity.id = 401;
          project_entity.project_name = "Trophies";
          project_entity.ownwer_id = 101;
          project_entity.workers = null;
          project_entity.completed = false;
          project_entity.teams = null;
          project_entity.man_hours = 80;

          all_projects[0] = project_entity;

          return all_projects;
  
        }

      } else if (query instanceof GetUserStatsQuery) {
        if (query.UserEmail === 'test@test.com' ) {

          const all_users = [];

          const user_person = new UserPerson();

          const positions = new PositionEntity();

          positions[0] = "tester";

          user_person.id = 123;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = query.UserEmail;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.positions = positions[0];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "tum";
          user_person.team_name = "ICS";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;

          all_users[0] = user_person;

          const user_stats = new UserStatsEntity();

          user_stats.teamMembers = all_users;
          user_stats.weeklyHours = 30;
          user_stats.assignedHours = 30;
          user_stats.utilisation = 100;
          user_stats.numberOfProjects = 1;
          user_stats.numberOfTeams = 2;
          user_stats.numberOfSkills = 9;

          return user_stats;
        }

      } else if (query instanceof GetAllTeamsOfACompany) {
        if (query.companyName === 'UP' ) {
          
          const all_teams = [];

          const team_entity = new TeamEntity();

          team_entity.id = 409;
          team_entity.team_name = "COS301"
          team_entity.members = null;
          team_entity.company_id = 19;
          team_entity.project_name = "UP";
          team_entity.projects = null;
          team_entity.project_id = 401;
          team_entity.completed = 0;

          all_teams[0] = team_entity;

          return all_teams;
        }

      } else if (query instanceof GetMonthlyUtilizationQuery) {
        if (query.Email === 'test@gmail.com') {

          const user_person = new UserPerson();

          const positions = new PositionEntity();
  
          positions[0] = "team lead";
  
          user_person.id = 129;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = query.Email;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "icreatesoftware";
          user_person.utilisation = 89;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
          
          return user_person.utilisation;

        }

      } else if (query instanceof GetRecomendedTeamQuery) {
        if (query.numPeople === 3 && query.SkillName === 'Java') {

          const all_users = [];

          let user_person = new UserPerson();
  
          const positions = new PositionEntity();
  
          positions[0] = "team lead";
  
          positions[1] = "admin";
  
          positions[2] = "senior";
  
          user_person.id = 123;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = "rourke@gmail.com";
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.positions = positions[0];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
  
          all_users[0] = user_person;
  
          user_person = new UserPerson();
  
          user_person.id = 66;
          user_person.name = "Sam";
          user_person.surname = "Smith";
          user_person.email = "ssmith@gmail.com";
          user_person.role = "developer";
          user_person.suspended = false;
          user_person.positions = positions[1];
          user_person.company_name = "icreatesoftware";
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
  
          all_users[1] = user_person;
  
          user_person = new UserPerson();
  
          user_person.id = 7;
          user_person.name = "james";
          user_person.surname = "bond";
          user_person.email = "fakeemail@gmail.com";
          user_person.role = "back-end";
          user_person.suspended = true;
          user_person.positions = positions[2];
          user_person.company_name = "MI6";
          user_person.project_name = "QSS";
          user_person.team_name = "00";
          user_person.company_id = 99;
          user_person.project_id = 62;
          user_person.team_id = 3;
  
          all_users[2] = user_person;
  
          return all_users;
  
        }

      } else if (query instanceof GetPositionsOfUserQuery) {
        if (query.email === 'test@example.com') {

          const user_person = new UserPerson();

          const positions = new PositionEntity();
  
          positions[0] = "team lead";
  
          user_person.id = 129;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = query.email;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "icreatesoftware";
          user_person.utilisation = 89;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
          
          return user_person.positions;

        }

      }

      return undefined;
    })
  }


  const mockCommandBus = {
    execute: jest.fn((command) => {
      if (command instanceof CreateUserCommand) {
        if (command.inviteLink === 'nggyunglydngraadu') {

          const user_person = new UserPerson();

          const positions = new PositionEntity();

          positions[0] = "team lead";

          user_person.id = 124;
          user_person.name = command.name;
          user_person.surname = command.surname;
          user_person.email = command.email;
          user_person.role = "intern";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "icreatesoftware";
          user_person.utilisation = 9;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 2;
          user_person.project_id = 6;
          user_person.team_id = 21;
          //well done rourke
          return user_person;
        }
      
      } else if (command instanceof CreateCompanyCommand) {
        if (command.companyName === 'manutd') {

          const user_company = new UserCompany();

          user_company.id = 28;
          user_company.company_name = command.companyName;
          user_company.admins = null;
          user_company.employees = null;
          user_company.projects = null;
          user_company.teams = null;

          return user_company;
        }

      } else if (command instanceof CreateProjectCommand) {
        if (command.manHours === 90) {

          const project_entity = new ProjectEntity();

          project_entity.id = 982;
          project_entity.project_name = command.projectName;
          project_entity.ownwer_id = 81;
          project_entity.workers = null;
          project_entity.completed = false;
          project_entity.teams = null;
          project_entity.man_hours = command.manHours;

          return project_entity;
        }

      } else if (command instanceof CreateAdminCommand) {
        if (command.name === 'bob') {

          const user_person = new UserPerson();

          const positions = new PositionEntity();

          positions[0] = "team lead";

          user_person.id = 129;
          user_person.name = command.name;
          user_person.surname = command.surname;
          user_person.email = command.email;
          user_person.role = "admin";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = command.companyName;
          user_person.utilisation = 81;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 8;
          user_person.project_id = 1;
          user_person.team_id = 0;
          
          return user_person;
        }

      } else if (command instanceof CreateTeamCommand) {
        if (command.teamName === 'burnley') {

          const team_entity = new TeamEntity();

          team_entity.id = 112;
          team_entity.team_name = command.teamName;
          team_entity.members = null;
          team_entity.company_id = 12;
          team_entity.project_name = "currie cup"
          team_entity.projects = null;
          team_entity.project_id = 4;
          team_entity.completed = 2;
  
          return team_entity;
        }
        
      } else if (command instanceof CreateInviteCodeCommand) {
        if (command.companyName === 'hotspur') {
  
          return 'thisshouldberandomlycreated';
        }

      } else if (command instanceof AddSkillCommand) {
        if (command.skillType === 'python') {
          
          const skills = new Skill();

          skills.id = 0;
          skills.skill = command.skillType;

          return skills;
        }

      } else if (command instanceof AssignHoursCommand) {
        if (command.UserEmail === 'rourke@gmail.com') {
          
          const user_person = new UserPerson();

          const positions = new PositionEntity();

          positions[0] = "team lead";

          user_person.id = 129;
          user_person.name = "Rourke";
          user_person.surname = "Amiss";
          user_person.email = command.UserEmail;
          user_person.role = "admin";
          user_person.suspended = false;
          user_person.approved = true;
          user_person.company_name = "car show";
          user_person.utilisation = 81;
          user_person.positions = positions[0];
          user_person.project_name = "tum";
          user_person.team_name = "team";
          user_person.company_id = 8;
          user_person.project_id = 1;
          user_person.team_id = 0;
          user_person.weekly_Hours = command.Hours;
          
          return user_person;
        }

      } else if (command instanceof CompleteProjectCommand) {
        if (command.projectName === "Top Gear") {

          const project_entity = new ProjectEntity();

          project_entity.id = 65;
          project_entity.project_name = command.projectName;
          project_entity.ownwer_id = 81;
          project_entity.workers = null;
          project_entity.completed = true;
          project_entity.teams = null;
          project_entity.man_hours = 60;

          return project_entity;
        }

      }

      return undefined;
    })
  }
  

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, FunctionsModule],
      providers: [
        ServiceFeatureService,
        { provide: QueryBus, useValue: mockQueryBus },
        { provide: CommandBus, useValue: mockCommandBus }
      ],
    }).compile();

      service = module.get<ServiceFeatureService>(ServiceFeatureService);
      createService = module.get<ServiceFeatureService>(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(createService).toBeDefined();
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

  describe("getNumberOfTeamsOfCompany", () => {
    it('should return the Number of Teams of Company', async () => {
      let test = 0;
      try {
        test = await service.getNumberOfTeamsOfCompany('icreate');
      } catch (err) { return }
      expect(test).toEqual(15);
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

  describe("getAllUserPerson", () => {
    it('should return a UserPerson[]', async () => {
      let test = new UserPerson();
      try {
        test = await service.getAllUserPerson();
      } catch (err) { return }
      expect(test[2]).toBeInstanceOf(UserPerson);
      });
  });

  describe("getCompanyStats", () => {
    it('should return CompanyStatsEntity', async () => {
      let test = new CompanyStatsEntity;
      try {
        test = await service.getCompanyStats('icreate');
      } catch (err) { return }
      expect(test.numTeams).toEqual(17);
      });
  });

  // incompelted? 
  describe("GetSkills", () => {
    it('should return Skills', async () => {
      let test = new Skill();
      try {
        test = await service.GetSkills();
      } catch (err) { return }
      expect(test[1].skill).toEqual('java');
      });
  });

  describe("GetUserSkills", () => {
    it('should return Skills of A User', async () => {
      let test = new Skill();
      try {
        test = await service.GetUserSkills('rourke@gmail.com');
      } catch (err) { return }
      expect(test[0].skill).toEqual('eating');
      });
  });

  describe("GetAllocatedProjects", () => {
    it('should return projects of A User', async () => {
      let test = new ProjectEntity();
      try {
        test = await service.GetAllocatedProjects('rourke@gmail.com');
      } catch (err) { return }
      expect(test[0]).toBeInstanceOf(ProjectEntity);
      });
  });

  describe("GetAllocatedTeams", () => {
    it('should return all teams of A User', async () => {
      let test = new TeamEntity();
      try {
        test = await service.GetAllocatedTeams('rourke@gmail.com');
      } catch (err) { return }
      expect(test[0]).toBeInstanceOf(TeamEntity);
      });
  });

  describe("GetTeamsOnProject", () => {
    it('should return all teams of a project', async () => {
      let test = new TeamEntity();
      try {
        test = await service.GetTeamsOnProject('UCL');
      } catch (err) { return }
      expect(test[0].team_name).toEqual('West Ham');
      });
  });

  describe("GetUserIDQuery", () => {
    it('should return a UserPerson via email', async () => {
      let test = new UserPerson();
      try {
        test = await service.getUserIDVEmail('test@test.com');
      } catch (err) { return }
      expect(test.id).toEqual(129);
      });
  });

  describe("GetAllProjectsOrTeamsOfCompany", () => {
    it('should return all projects and teams of a compnay', async () => {
      let test = new TeamEntity();
      try {
        test = await service.getAllProjectsAndTeamsOfCompany('Soccer', 1);
      } catch (err) { return }
      expect(test[0].team_name).toEqual('East Ham');
      });
  });

  describe("getAllMembersOfTeam", () => {
    it('should return all users of a team', async () => {
      let test = new TeamEntity();
      try {
        test = await service.getAllMembersOfTeam('Man City');
      } catch (err) { return }
      expect(test[2].name).toEqual("james");
      });
  });

  describe("getInviteCode", () => {
    it('should return the invite code of a company', async () => {
      let test = new UserCompany();
      try {
        test = await service.GetInviteCode('ABC');
      } catch (err) { return }
      expect(test.invite_code).toEqual("ABC123");
      });
  });

  describe("GetAllTeamsWorkingOnProjectCommand", () => {
    it('should return the teams working on a project', async () => {
      let test = new TeamEntity();
      try {
        test = await service.GetAllTeamsWorkingOnProjectServ('Capstone');
      } catch (err) { return }
      expect(test[0].id).toEqual(404);
      });
  });

  describe("GetAllProjectsOfTeamsQuery", () => {
    it('should return the projects assigned to a team', async () => {
      let test = new ProjectEntity();
      try {
        test = await service.GetAllProjectsOfATeamServ('ICS');
      } catch (err) { return }
      expect(test[0].id).toEqual(401);
      });
  });

  describe("GetUserStatsQuery", () => {
    it('should return the user stats', async () => {
      let test = new UserStatsEntity();
      try {
        test = await service.GetUserStats('test@test.com');
      } catch (err) { return }
      expect(test.assignedHours).toEqual(30);
      });
  });

  describe("GetAllTeamsOfACompany", () => {
    it('should return the teams of a company', async () => {
      let all_teams = [];
      try {
        all_teams = await service.getAllTeamsOfACompanyService('UP');
      } catch (err) { return }
      expect(all_teams[0].team_name).toEqual('COS301');
      });
  });

  describe("GetMonthlyUtilization", () => {
    it('should return the utilization of a user', async () => {
      let util = 0;
      try {
        util = await service.GetMonthlyUtilization('test@gmail.com');
      } catch (err) { return }
      expect(util).toEqual(89);
      });
  });

  describe("GetRecomendedTeam", () => {
    it('should return list of users', async () => {
      let team = [];
      try {
        team = await service.GetRecomendedTeam(3, "Java");
      } catch (err) { return }
      expect(test.length).toEqual(3);
      });
  });

  describe("GetPositionsOfUserQuery", () => {
    it('should return a users positions', async () => {
      let pos = [];
      try {
        pos = await service.GetPositionsOfUser("test@example.com");
      } catch (err) { return }
      expect(pos).toEqual("team lead");
      });
  });


  // commandsBus

  describe("createUser", () => {
    it('should create a UserPerson', async () => {
      let test = new UserPerson();
      try {
        test = await createService.createUser('rob','roll','rick@roll.com','nggyunglydngraadu');
      } catch (err) { return }
      expect(test.id).toEqual(124);
      expect(test.name).toEqual("rob");
      expect(test.surname).toEqual("roll");
      expect(test.email).toEqual("rick@roll.com")
    });
  });

  describe("createCompany", () => {
    it('should create a UserCompany', async () => {
      let test = new UserCompany();
      try {
        test = await createService.createCompany('manutd');
      } catch (err) { return }
      expect(test.company_name).toEqual('manutd');
    });
  });

  describe("createProject", () => {
    it('should create a ProjectEntity', async () => {
      let test = new ProjectEntity();
      try {
        test = await createService.createProject('javacoffee','icreate','liverpool', 90);
      } catch (err) { return }
      expect(test.project_name).toEqual('javacoffee');
      expect(test.man_hours).toEqual(90);
    });
  });

  describe("createTeam", () => {
    it('should create a TeamEntity', async () => {
      let test = new TeamEntity();
      try {
        test = await createService.createTeam('burnley', 'premierleague');
      } catch (err) { return }
      expect(test.id).toEqual(112);
      expect(test).toBeInstanceOf(TeamEntity);
    });
  });

  describe("createAdmin", () => {
    it('should create a UserPerson as admin', async () => {
      let test = new UserPerson();
      try {
        test = await createService.createAdmin('bob','bowl','brick@bowl.com','champions league');
      } catch (err) { return }
      expect(test.role).toEqual('admin');
    });
  });

  describe("createInviteCode", () => {
    it('should create an InviteCode', async () => {
      let test;
      try {
        test = await createService.createInviteCode('hotspur');
      } catch (err) { return }
      expect(test).toEqual('thisshouldberandomlycreated');
    });
  });

  describe("AddSkill", () => {
    it('should add a Skill', async () => {
      let test = new Skill();
      try {
        test = await createService.AddSkill('python');
      } catch (err) { return }
      expect(test.skill).toEqual('python');
    });
  });

  describe("AssignWeeklyHoursToEmployee", () => {
    it('should assign hours to a User', async () => {
      let test = new UserPerson();
      try {
        test = await createService.AssignHours('rourke@gmail.com', 90);
      } catch (err) { return }
      expect(test.weekly_Hours).toEqual(90);
    });
  });

  describe("CompleteProject", () => {
    it('should complete a ProjectEntity', async () => {
      let test = new ProjectEntity();
      try {
        test = await createService.CompleteProject('Top Gear');
      } catch (err) { return }
      expect(test.project_name).toEqual('Top Gear');
      expect(test.completed).toEqual(true);
    });
  });

});

