
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import {ServiceFeatureService} from '@team-utilisation-monitor/service/feature'

import { UserInputError } from 'apollo-server-express';

@Resolver(() => UserPerson)
export class ApiFeatureResolver {

  constructor(private readonly service: ServiceFeatureService ) {}

  @Query(() => UserPerson)
  async login(email:string,password:string){
      const resp=this.service.login(email,password);
      return resp;
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
  async deleteUser(@Args('userNum', { type: () => String }) id: string) {
    return new UserInputError('Not implemented');
  }

}
