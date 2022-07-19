import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CompanyStatsEntity, InviteCodeEntity, ProjectEntity, TeamEntity, UserCompany, UserPerson, UserStatsEnity } from '@team-utilisation-monitor/api/shared/data-access';
import {ServiceFeatureService} from '@team-utilisation-monitor/service/feature'

import { UserInputError } from 'apollo-server-express';

@Resolver()
export class ApiFeatureResolver {

  constructor(private readonly service: ServiceFeatureService ) {}

  @Query(() => UserPerson)
  async login(@Args("email") email:string, @Args("password") password:string){
      const resp=await this.service.login(email, password);
      console.log(resp);
      return resp;
  }

  @Query(()=>String)
  async getInviteCode(@Args("name") companyName:string)
  {
    const resp=await this.service.GetInviteCode(companyName);
    return resp
  }

  /***
   * This function returns a company object of type UserCompany
   */

  @Query(() => UserCompany)
  async GetCompanyQuery(@Args("name") company_name:string){
      const resp=await this.service.getCompany(company_name);
      return resp;
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
   * This function returns a single user object based on the email argument
   */

  @Query(()=>UserPerson)
  async getOnePerson(@Args("email") email:string )
  {
    const resp=this.service.getOnePersonVEmailService(email);

    return resp;
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
  async getCompanyStats(@Args("company_name") company_name:string)
  {
    const resp=await this.service.getCompanyStats(company_name);

    return resp;
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
  async getAllPeople(){
    const resp=await this.service.getAllUserPerson();
    console.log(resp);
    return resp;
  }


  /***
   * This function returns all the projects of a company as an array
   * The 0 indicates that you want a projects, not teams
  */

  @Query(()=>[ProjectEntity])
  async getAllProjectsOfACompany(@Args("company_name") company_name:string)
  {
    const resp= await this.service.getAllProjectsAndTeamsOfCompany(company_name,0);

    return resp;
  }

  /***
   * This function returns all the teams of a company as an array
   * The 1 indicates that you want a teams, not teams
  */

   @Query(()=>[TeamEntity])
   async getAllTeamsOfACompany(@Args("company_name") company_name:string)
   {
     const resp= await this.service.getAllProjectsAndTeamsOfCompany(company_name,1);

     return resp;
  }

  /***
   * This function returns an array of UserPerson objects. Use this function
   * To get all pending requests against the argument company.
   * In it's current state, the objects will contain id,name,surname and email
   */

  @Query(()=>[UserPerson])
  async getPendingRequests(@Args("company_name") company_name:string)
  {
    const resp=await this.service.getPendingRequests(company_name);

    return resp;
  }

  /***
   * This function creates an inviteCode to be used by the user to login.
   * There's a 1-1 mapping between the invite code and a company
   */

  @Mutation(()=>InviteCodeEntity)
  async createInviteCode(@Args("company_name") company_name:string)
  {
    const resp=await this.service.createInviteCode(company_name);

    return resp;
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
  async createProject(@Args("project_name") project_name:string,@Args("company_name") company_name:string, @Args("team_name") team_name:string,@Args("man_hours")man_hours:number)
  {
    const resp= await this.service.createProject(project_name,company_name,team_name,man_hours);

    return resp;
  }

  /***
   * This function is used to create a team
   */

  @Mutation(()=>TeamEntity)
  async createTeam(@Args("team_name") team_name:string,@Args("company_name")company_name:string)
  {
    const resp=await this.service.createTeam(team_name,company_name);

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
   * This function is used to approve requests via email
   * Returns true if process was successful,false otherwise
   */

    @Mutation(()=>Boolean)
    async approveRequestVEmail(@Args("email") email:string)
    {
      const resp=await this.service.approveRequestVEmail(email);

      return resp;
    }

    @Mutation(()=>String)
    async AddTeamMember(@Args("team_name") teamName:string,@Args("email") email:string)
    {
      return await this.service.AddTeamMember(teamName,email);
    }

    @Query(()=>[UserPerson])
    async GetTeamMembers(@Args("team_name") teamName:string)
    {
      return await this.service.GetTeamMembers(teamName);
    }


  @Query(() => String)
  pingUser() {
    return 'on';
  }

  @Mutation(()=>String)
  async DeleteTeamMember(@Args("team_name") teamName:string,@Args("email") EmployeeEmail:string)
  {
    return await this.service.DeleteTeamMember(teamName,EmployeeEmail)
  }

  @Mutation(()=>UserPerson)
  async DeleteEmployee(@Args("email") email:string)
  {
    return await this.service.DeleteEmployee(email);
  }

  @Mutation(()=>String)
  async AddSkill(@Args("skillType") skill:string)
  {
    return await this.service.AddSkill(skill);
  }

  @Query(()=>[String])
  async GetSkill()
  {
    return await this.service.GetSkills();
  }

  /*@Mutation(() => UserPerson)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return new UserInputError('Not implemented');
  }
*/

  //Mock Object:
 /* async getMock() {
    const mockUser = new UserPerson();
    mockUser.id = -1;
    mockUser.name = "Rourke"
    mockUser.email = "icreatesoftware@gmail.com"
    return mockUser;
  }*/
}
