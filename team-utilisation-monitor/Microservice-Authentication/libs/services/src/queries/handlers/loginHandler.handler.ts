import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AuthRepositoryService } from "auth-repo/auth-repository";
import { AuthAdminEntity } from "../../../../../../libs/api/shared/data-access/src";
import { Login } from "../impl/login.query";
import * as bcrypt from 'bcrypt'

/***
 * The function returns the user details on success. 
 * returns null if login password is wromg.
 */

@QueryHandler(Login)
export class LoginHandler implements IQueryHandler<Login>{

   constructor(private readonly repository:AuthRepositoryService){}

   async execute(query: Login): Promise<any> {

      const user=await this.repository.login(query.username,query.password);

      //console.log(user);

      if(user!=null)
      {
         const hash=user.password;

         const isMatch = await bcrypt.compare(query.password, hash);
         console.log(isMatch);

         if(isMatch)
         {
            return user;
         }
         else
         {
            console.log("In function LoginHandler, Wrong password was entered"); 
            return null;
         }
      }
      else
      {
         console.log("In function LoginHandler, wrong username provided ");
         return null;
      }

     

   
   }
}	