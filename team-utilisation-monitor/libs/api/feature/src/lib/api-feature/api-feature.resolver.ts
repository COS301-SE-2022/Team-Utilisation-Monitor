
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import {ServiceFeatureService} from '@team-utilisation-monitor/service/feature'

import { UserInputError } from 'apollo-server-express';

@Resolver(() => UserPerson)
export class ApiFeatureResolver {

  constructor(private readonly service: ServiceFeatureService ) {}

  @Query(() => UserPerson)
  async login(email:string,password:string){
      const resp=this.service.login(email, password);
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
  sayHello(): string {
    return 'Hello World!';
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
