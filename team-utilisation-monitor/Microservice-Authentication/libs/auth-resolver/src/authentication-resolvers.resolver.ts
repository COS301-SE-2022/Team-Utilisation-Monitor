
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServicesService } from 'micro-auth-service/services';
import { AuthAdminEntity } from '../../../../libs/api/shared/data-access/src';

@Resolver()
export class AuthenticationResolversResolver {

    constructor(private readonly service:ServicesService){}

    @Query(() => String)
    hello(){
        return 'Hello World!';
    }

    @Mutation(()=>AuthAdminEntity)
    async registerAdminGateway(@Args("username") f_username:string, @Args("password") f_pass:string){

        const resp=await this.service.registerAdminServ(f_username,f_pass);
        return resp;
    }
    
    @Mutation(()=>AuthAdminEntity)
    async registerUserGateway(@Args("username") f_username:string,@Args("password") f_pass:string)
    {
        const resp=await this.service.registerUserServ(f_username,f_pass);
        return resp;
    }

    
}
