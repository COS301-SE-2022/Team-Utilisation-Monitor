import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreatePersonCommand } from "../impl/create-person.command";
import { CreateProjectCommand } from "../impl/create-project.command";

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: CreateProjectCommand): Promise<any> {
        return this.repository.createProject(command.projectName,command.companyName,command.manHours,command.teamName); 
    }
}