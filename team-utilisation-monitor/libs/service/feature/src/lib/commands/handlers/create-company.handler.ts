import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreateCompanyCommand } from "../impl/create-company.command";

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: CreateCompanyCommand): Promise<any> {
        return this.repository.createCompnany(command.companyName);
    }
}