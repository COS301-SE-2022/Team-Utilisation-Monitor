import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Login } from "../impl/login.query";

@QueryHandler(Login)
export class LoginHandler implements IQueryHandler<Login>{
   async execute(query: Login): Promise<any> {
       
   }
}	