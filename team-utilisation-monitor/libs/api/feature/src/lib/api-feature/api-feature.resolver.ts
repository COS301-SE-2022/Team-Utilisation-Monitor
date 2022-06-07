import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { InviteCodeEntity, ProjectEntity, TeamEntity, UserCompany, UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
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

  @Query(() => UserCompany)
  async GetCompanyQuery(@Args("name") company_name:string){
      const resp=await this.service.getCompany(company_name);
      return resp;
  }

  @Query((returns) => UserPerson, { name: 'name' })
  async getUser(@Args('userId', { type: () => String }) userId: string) {
    let id;
    if (userId == '123') id = '1';
    else id = null;

    const userObj = new UserPerson();
    userObj.id = id;

    return userObj;
  }



  @Query(() => String)
  sayHello(@Args("name") name:string){
    return 'Hello '+name;
  }

  @Query(()=>[UserPerson])
  async getAllPeople(){
    const resp=await this.service.getAllUserPerson();
    console.log(resp);
    return resp;
  }

  @Mutation(()=>UserPerson)
  async createPerson(@Args("name") name:string,@Args("surname") surname:string,@Args("email") email:string,@Args("password") password:string,@Args("role") role:string,@Args("suspended") suspended:string,@Args("company_name") company_name:string)
  {
    let R:Role;
    let sus:boolean;

    if(role==="USER")
      R=Role.USER;
    else
      R=Role.ADMIN;

    if(suspended==="true")
      sus=true;
    else
      sus=false;

    const resp=await this.service.signup(name,surname,email,password,R,sus,company_name);

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
  async createAdmin(@Args("name") name:string,@Args("surname") surname:string,@Args("email") email:string,@Args("password") password:string,@Args("company_name")company_name:string)
  {
    const resp=await this.service.createAdmin(name,surname,email,password,company_name);

    return resp;
  }

  /***
   * This function is used to create a user i.e role=USER
   */

  @Mutation(()=>UserPerson)
  async createUser(@Args("name") name:string,@Args("surname") surname:string,@Args("email") email:string,@Args("password")password:string,@Args("inviteCode")inviteCode:string)
  {
    const resp=await this.service.createUser(name,surname,email,password,inviteCode)

    return resp;
  }


  @Query(() => String)
  pingUser() {
    return 'on';
  }

  @Mutation((returns) => UserPerson)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return new UserInputError('Not implemented');
  }


  //Mock Object:
  async getMock() {
    const mockUser = new UserPerson();
    mockUser.id = -1;
    mockUser.name = "Rourke"
    mockUser.email = "icreatesoftware@gmail.com"
    return mockUser;
  }
}
