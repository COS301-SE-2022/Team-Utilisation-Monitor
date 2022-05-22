
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import {ServiceFeatureService} from '@team-utilisation-monitor/service/feature'

import { UserInputError } from 'apollo-server-express';

@Resolver(() => UserPerson)
export class ApiFeatureResolver {

  constructor(private readonly service: ServiceFeatureService ) {}

  @Query(() => UserPerson)
  async login(@Args("email") email:string, @Args("password") password:string){
      const resp=await this.service.login(email, password);
      console.log(resp);
      return resp;
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
    mockUser.id = 123;
    mockUser.name = "Rourke"
    mockUser.email = "icreatesoftware@gmail.com"
    return mockUser;
  }
}
