import { CommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreateTeamCommand } from "../impl/create-team.command";


@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements IQueryHandler<CreateTeamCommand>{


    constructor(private readonly repository:DataAccessRepository){}

    async execute(command: CreateTeamCommand): Promise<any> {
        return this.repository.createTeam(command.teamName,command.companyName);
    }
}