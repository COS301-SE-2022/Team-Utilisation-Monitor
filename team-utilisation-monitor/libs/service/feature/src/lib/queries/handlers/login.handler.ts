import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserPerson } from "@team-utilisation-monitor/api/shared/data-access";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { ServiceFeatureService } from "../../service-feature.service";
import { Login } from "../impl/login.query";

@QueryHandler(Login)
export class LoginHandler implements IQueryHandler<Login>{

    constructor(private service:ServiceFeatureService){}

    /***
      * The function returns the object if the authentication is successful
      * Take note: Login is very simple. Improve later!
    */

    async execute(query: Login): Promise<any>
    {
        const person=this.service.getOnePersonVEmailService(query.email);

        if(person)
        {
            if((await person).email===query.email){
                
                if((await person).password===query.password)
                {
                    return person;
                }
                else
                    return "incorrect password"
            }
            else
                return "incorrect email"
        }
        else
            return "user doesn't exist";
    }

}