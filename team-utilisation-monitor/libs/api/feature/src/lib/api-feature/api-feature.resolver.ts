
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
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
