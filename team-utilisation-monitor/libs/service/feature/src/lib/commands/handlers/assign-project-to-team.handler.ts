import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AssignProjectToTeamCommand } from "../impl/assign-project-to-team.command";

@CommandHandler(AssignProjectToTeamCommand)
export class AssignProjectToTeamHandler implements ICommandHandler<AssignProjectToTeamCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    execute(command: AssignProjectToTeamCommand): Promise<any> {
        return this.repository.AssignProjectToTeam(command.teamID,command.projectID)
    }
}