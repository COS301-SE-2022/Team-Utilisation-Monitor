import { CommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserPerson } from "@team-utilisation-monitor/api/shared/data-access";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import console = require("console");
import { CreateUserCommand } from "../impl/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: CreateUserCommand): Promise<UserPerson> 
    {   
        const resp=await this.repository.createUser(query.name,query.surname,query.email,query.password,query.inviteLink);
        

        return resp;
    }
}