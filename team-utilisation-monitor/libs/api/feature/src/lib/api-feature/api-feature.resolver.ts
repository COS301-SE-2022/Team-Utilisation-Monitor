import { HttpException, HttpStatus } from '@nestjs/common';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { CompanyStatsEntity, InviteCodeEntity, ProjectEntity, TeamEntity, UserCompany, UserPerson, UserStatsEntity, Skill, Utilization, CompanyUtilization, PositionEntity, trendingSkill } from '@team-utilisation-monitor/api/shared/data-access';
import {ServiceFeatureService} from '@team-utilisation-monitor/service/feature'
import { MessageObject, NullException } from '@team-utilisation-monitor/shared/services/prisma-services';
import { UserInputError } from 'apollo-server-express';
import { Token } from 'graphql';

@Resolver()
export class ApiFeatureResolver {

  constructor(private readonly service: ServiceFeatureService) {}

  /***
   * Use this function to get all teams associated with a project. Returns an array []
  **/

  @Query(()=>[TeamEntity])
  async getAllTeamsWorkingOnProject(@Args("project_name")project_name:string,@Args("token")token:string,@Args("email")email:string){

    const verification=await this.service.verifyToken(email,token);

    if(verification){

      const resp=await this.service.GetAllTeamsWorkingOnProjectServ(project_name);
      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }


  /****
   * This function gets all the projects of a team
  */

  @Query(()=>[ProjectEntity])
  async getAllProjectsOfATeam(@Args("team_name")team_name:string)
  {
    const resp=await this.service.GetAllProjectsOfATeamServ(team_name);
    return resp;
  }

  @Query(() => UserPerson)
  async login(@Args("email") email:string, @Args("password") password:string){
      const resp=await this.service.login(email, password);

      return resp;
  }

  @Query(()=>String)
  async getInviteCode(@Args("name") companyName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.GetInviteCode(companyName);
      return resp
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  /***
   * This function returns a company object of type UserCompany
   */

  @Query(() => UserCompany)
  async GetCompanyQuery(@Args("name") company_name:string,@Args("token")token:string,@Args("email")email:string){

    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.getCompany(company_name);
      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(() => UserPerson, { name: 'name' })
  async getUser(@Args('userId', { type: () => String }) userId: string) {
    let id;
    if (userId == '123') id = '1';
    else id = null;

    const userObj = new UserPerson();
    userObj.id = id;

    return userObj;
  }


  /***
   * Use this query to get all the teams associated with a company
  */

  @Query(()=>[TeamEntity])
  async getAllTeamsOfAcompanyWithTheirMembers(@Args("email")email:string,@Args("token")token:string,@Args("company_name")companyName:string){

    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=this.service.getAllTeamsOfACompanyService(companyName);

      return resp;
    }
    else{
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

    }

  }

  /***
   * This function returns a single user object based on the email argument
   */

  @Query(()=>UserPerson)
  async getOnePerson(@Args("email") email:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=this.service.getOnePersonVEmailService(email);

      return resp;
    }
    else{
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

    }

  }

  /***
   * This function is used to get the user ID. It returns an object that contains
   * only the ID
   */

  @Query(()=>UserPerson)
  async getUserID(@Args("email")email:string)
  {
    const resp=await this.service.getUserIDVEmail(email);

    return resp;
  }

  /***
   * This function returns the company's stats. This is an object that includes
   * number of projects,number of teams,number of employees,number of admins
   * use numTeams,numProjects,numEmployees,numAdmins
   */

  @Query(()=>CompanyStatsEntity)
  async getCompanyStats(@Args("company_name") company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.getCompanyStats(company_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  /****
   * This function is used to get all the employees of an organisation.
   * It returns an array of all employees
   */


  @Query(()=>[UserPerson])
  async getEmployeesOfACompany(@Args("company_name") company_name:string)
  {
    const resp=await this.service.getAllEmployees(company_name);

    return resp;
  }



  @Query(() => String)
  sayHello(@Args("name") name:string){
    return 'Hello '+name;
  }

  /***
   * This function is used to get all users in the databse irrespective of company
   */

  @Query(()=>[UserPerson])
  async getAllPeople(@Args("token")token:string,@Args("email")email:string){
    
    const verification=await this.service.verifyToken(email,token);
    
    if(verification){
      const resp=await this.service.getAllUserPerson();
   
      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
        
  }

  @Mutation(()=>Boolean)
  async removePosition(@Args("token")token:string,@Args("email")email:string,@Args("position_name")position_name:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      const resp=await this.service.RemovePosition(position_name);
   
      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }


  /***
   * This function returns all the projects of a company as an array
   * The 0 indicates that you want a projects, not teams
  */

  @Query(()=>[ProjectEntity])
  async getAllProjectsOfACompany(@Args("company_name") company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      const resp= await this.service.getAllProjectsAndTeamsOfCompany(company_name,0);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  /***
   * This function returns all the teams of a company as an array
   * The 1 indicates that you want a teams, not projects
  */

  @Query(()=>[TeamEntity])
  async getAllTeamsOfACompany(@Args("company_name") company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      const resp= await this.service.getAllProjectsAndTeamsOfCompany(company_name,1);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  /***
   * This function returns the number teams of a company
  */

  @Query(()=>[Number])
  async getNumberOfTeamsOfCompany(@Args("company_name") company_name:string)
  {
    const resp= await this.service.getNumberOfTeamsOfCompany(company_name);

    return resp;
  }


  /***
   * This function returns the stats of members in a team
  */

  @Query(()=>[UserStatsEntity])
  async getAllMembersOfTeam(@Args("team_name") team_name:string)
  {
    const resp= await this.service.getAllMembersOfTeam(team_name);

    return resp;
  }

  /***
   * This function returns an array of UserPerson objects. Use this function
   * To get all pending requests against the argument company.
   * In it's current state, the objects will contain id,name,surname and email
   */

  @Query(()=>[UserPerson])
  async getPendingRequests(@Args("company_name") company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      const resp=await this.service.getPendingRequests(company_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }


  @Mutation(()=>MessageObject)
  async addPosition(@Args("position_name")position_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.AddPosition(position_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Mutation(()=>MessageObject)
  async assignPositionToUser(@Args("position_name")position_name:string,@Args("token")token:string,@Args("email")email:string,@Args("assignee_email")assignee_email:string,@Args("team_name")team_name:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.AssignPositionToUser(position_name,assignee_email,team_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[PositionEntity])
  async getAllPositions(@Args("token")token:string,@Args("email")email:string){
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.GetAllPositions();

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[PositionEntity])
  async getPositionsOfUser(@Args("token")token:string,@Args("email")email:string){
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.GetPositionsOfUser(email);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }


  /***
   * This function creates an inviteCode to be used by the user to login.
   * There's a 1-1 mapping between the invite code and a company
  */

  @Mutation(()=>InviteCodeEntity)
  async createInviteCode(@Args("company_name") company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.createInviteCode(company_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  /***
   * This function is used to create a company.
   */

  @Mutation(()=>UserCompany)
  async createCompany(@Args("company_name")company_name:string)
  {
    const resp= await this.service.createCompany(company_name);

    return resp;
  }

  /***
   * This function is used to create a project
   */

  @Mutation(()=>ProjectEntity)
  async createProject(@Args("project_name") project_name:string,@Args("company_name") company_name:string, @Args("team_name") team_name:string,@Args("man_hours")man_hours:number,@Args("token")token:string,@Args("email")email:string)
  {

    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp= await this.service.createProject(project_name,company_name,team_name,man_hours);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  /***
   * This function is used to create a team
   */

  @Mutation(()=>TeamEntity)
  async createTeam(@Args("team_name") team_name:string,@Args("company_name")company_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.createTeam(team_name,company_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  /***
   * Use this function to assign a project to a team using the project and team's names
  */

  @Mutation(()=>String)
  async assignProjectToTeamVName(@Args("team_name")team_name:string, @Args("project_name")project_name:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      const resp=await this.service.AssignProjectToTeamVName(team_name,project_name);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }


  /***
   * Us this function to assign a project to a team
   */

  @Mutation(()=>String)
  async assignProjectToTeam(@Args("team_id")team_id:number,@Args("project_id")project_id:number)
  {

    const resp=await this.service.AssignProjectToTeamServ(team_id,project_id);

    return resp;
  }

  /***
   * This function is used to create an Admin
   */

  @Mutation(()=>UserPerson)
  async createAdmin(@Args("name") name:string,@Args("surname") surname:string,@Args("email") email:string,@Args("company_name")company_name:string)
  {
    const resp=await this.service.createAdmin(name,surname,email,company_name);

    return resp;
  }

  /***
   * This function is used to create a user i.e role=USER
  */

  @Mutation(()=>UserPerson)
  async createUser(@Args("name") name:string,@Args("surname") surname:string,@Args("email") email:string,@Args("inviteCode")inviteCode:string)
  {
    const resp=await this.service.createUser(name,surname,email,inviteCode)

    return resp;
  }

  /***
   * Use this function to set the token
   */

  @Mutation(()=>Boolean)
  async SetToken(@Args("token")token:string,@Args("email")email:string)
  {
    const resp=await this.service.setToken(email,token);

    return resp;
  }

  @Mutation(()=>Boolean)
  async VerifyToken(@Args("email") email:string,@Args("token") Token:string)
  {
    return await this.service.verifyToken(email,Token);
  }

  /***
  * This function is used to approve requests via email
  * Returns true if process was successful,false otherwise
  */

  @Mutation(()=>Boolean)
  async approveRequestVEmail(@Args("email") email:string,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token);

    if(verification){
      const resp=await this.service.approveRequestVEmail(email);

      return resp;
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Mutation(()=>String)
  async AddTeamMember(@Args("team_name") teamName:string,@Args("email") email:string,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token);

    if(verification){
      return await this.service.AddTeamMember(teamName,email);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[UserPerson])
  async GetTeamMembers(@Args("team_name") teamName:string,@Args("token")token:string,@Args("email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token);

    if(verification){
      return await this.service.GetTeamMembers(teamName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }


  @Query(() => String)
  pingUser() {
    return 'on';
  }

  @Mutation(()=>String)
  async DeleteTeamMember(@Args("team_name") teamName:string,@Args("email") EmployeeEmail:string,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token);

    if(verification){
      return await this.service.DeleteTeamMember(teamName,EmployeeEmail)
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Mutation(()=>UserPerson)
  async DeleteEmployee(@Args("email") email:string,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token);

    if(verification){
      return await this.service.DeleteEmployee(email);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Mutation(()=>String)
  async AddSkill(@Args("skillType") skill:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      return await this.service.AddSkill(skill);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Query(()=>[Skill])
  async GetSkill()
  {
    return await this.service.GetSkills();
  }

  @Mutation(()=>String)
  async UpdateProfile(@Args("token")token:string,@Args("email") Email:string,@Args("name") Name?:string,@Args("surname") Surname?:string)
  {
    const verification=await this.VerifyToken(Email,token);

    if(verification){
      return await this.service.UpdateProfile(Email,Name,Surname);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[UserPerson])
  async GetUnderUtilizedEmployees(@Args("company_name") cName:string,@Args("token")token:string,@Args("email")Email:string)
  {
    const verification=await this.VerifyToken(Email,token);

    if(verification){
      return await this.service.GetUnderUtilizedEmps(cName)
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[TeamEntity])
  async GetAllocatedTeams(@Args("email") uEmail:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(uEmail,token);

    if(verification)
      return await this.service.GetAllocatedTeams(uEmail);
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[ProjectEntity])
  async GetAllocateProjects(@Args("email") UserEmail:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(UserEmail,token);

    if(verification)
       return await this.service.GetAllocatedProjects(UserEmail);
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Mutation(()=>String)
  async removeSkill(@Args("skill_name")skill_name:string,@Args("email") email:string,@Args("token")token:string){
    const verification=await this.VerifyToken(email,token);

    if(verification){
      return await this.service.DeleteSkill(skill_name);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Mutation(()=>String)
  async UpdateUserSkill(@Args("email") UserEmail:string,@Args("skillName") skillName:string,@Args("token")token:string)
  {
    return await this.service.UpdateUserSkill(UserEmail,skillName)
  }

  @Query(()=>[String])
  async GetUserSkills(@Args("email") UserEmail:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(UserEmail,token);

    if(verification){
      return await this.service.GetUserSkills(UserEmail)
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>UserStatsEntity)
  async GetUserStats(@Args("email") UserEmail:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(UserEmail,token);

    if(verification){
      return await this.service.GetUserStats(UserEmail);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Mutation(()=>String)
  async AssignHours(@Args("email") UserEmail:string,@Args("weekly_hours") hours:number,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token); //verify using admin email

    if(verification){
      return await this.service.AssignHours(UserEmail,hours);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Mutation(()=>String)
  async CalculateUtilization(@Args("project_Name") projectName:string,@Args("token")token:string,@Args("admin_email")admin_email:string)
  {
    const verification=await this.VerifyToken(admin_email,token); //verify using admin email

    if(verification){
      return await this.service.CalculateUtilization(projectName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);


  }

  @Mutation(()=>String)
  async calculateUstilisationTWO(@Args("company_name")companyName:string)
  {
    return await this.service.CalculateUtilisationTWO(companyName);
  }

  @Query(()=>[String])
  async GetAvailableTeams(@Args("project_name") projectName:string)
  {
    return await this.service.GetAvailableTeams(projectName);
  }

  @Mutation(()=>String)
  async assignWeeklyHoursToEmployee(@Args("email")email:string,@Args("weekly_hours")weekly_hours:number)
  {
    return await this.service.AssignWeeklyHoursToEmployee(email,weekly_hours);
  }

  @Query(()=>[Utilization])
  async GetMonthlyUtilization(@Args("email") email:string,@Args("token")token:string)
  {
    const verification=await this.VerifyToken(email,token);

    if(verification){
      return await this.service.GetMonthlyUtilization(email);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>CompanyUtilization)
  async GetCompanyUtilization()
  {
    return await this.service.GetCompanyUtilization();
  }

  @Mutation(()=>String)
  async CompleteProject(@Args("project_name") projectName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.CompleteProject(projectName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Mutation(()=>String)
  async DeleteProject(@Args("project_name") projectName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.DeleteProject(projectName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Query(()=>[TeamEntity])
  async GetTeamsOnProject(@Args("project_name") projectName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.GetTeamsOnProject(projectName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

  @Mutation(()=>String)
  async DeleteTeam(@Args("team_name") teamName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.DeleteTeam(teamName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[UserPerson])
  async GetRecomendedTeam(@Args("num_people") numberOfPeople:number,@Args("skill_name") skillName:string,@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.GetRecomendedTeam(numberOfPeople,skillName);
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);
  }

  @Query(()=>[trendingSkill])
  async getTrendSkill(@Args("token")token:string,@Args("email")email:string)
  {
    const verification=await this.service.verifyToken(email,token);

    if(verification){
      return await this.service.getTrendSkill();
    }
    else
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Token cannot be verified',
    }, HttpStatus.FORBIDDEN);

  }

}
