import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreateUserCommand } from "../impl/create-user.command";

@QueryHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand>{


    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: CreateUserCommand): Promise<any> {
        return this.repository.createUser(query.name,query.surname,query.email,query.inviteLink);
    }
}