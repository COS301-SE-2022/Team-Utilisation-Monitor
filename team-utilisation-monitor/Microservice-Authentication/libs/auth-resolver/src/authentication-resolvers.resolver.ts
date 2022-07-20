import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServicesService } from 'micro-auth-service/services';
import { AuthAdminEntity } from 'shared/Entities/api-auth-admin.entity';

@Resolver()
export class AuthenticationResolversResolver {

    constructor(private readonly service:ServicesService){}

    @Query(() => String)
    hello(){
        return 'Hello World!';
    }

    @Mutation(()=>AuthAdminEntity)
    async registerAdminGateway(@Args("name")name:string,@Args("surname")surname:string,@Args("username") f_username:string, @Args("password") f_pass:string){

        const resp=await this.service.registerAdminServ(name,surname,f_username,f_pass);
        return resp;
    }
    
    @Mutation(()=>AuthAdminEntity)
    async registerUserGateway(@Args("name")name:string,@Args("surname")surname:string,@Args("username") f_username:string,@Args("password") f_pass:string)
    {
        const resp=await this.service.registerUserServ(name,surname,f_username,f_pass);
        return resp;
    }

    @Query(()=>AuthAdminEntity)
    async loginGateway(@Args("username") f_username:string,@Args("password") f_pass:string)
    {
        const resp=await this.service.LoginServ(f_username,f_pass);
        return resp;
    }

    @Query(()=>Boolean)
    async verifyToken(@Args("token")f_token:string)
    {
        const resp=await this.service.verifyToken(f_token);
        return resp;
    }

    
}
