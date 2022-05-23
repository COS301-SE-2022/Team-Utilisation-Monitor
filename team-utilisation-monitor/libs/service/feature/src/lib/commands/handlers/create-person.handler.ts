import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreatePersonCommand } from "../impl/create-person.command";

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: CreatePersonCommand): Promise<any> {
        return this.repository.createPerson(command.name,command.surname,command.email,command.role,command.password,command.suspended,command.company_name); 
    }
}