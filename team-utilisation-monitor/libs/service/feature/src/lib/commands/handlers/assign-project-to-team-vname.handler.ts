import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AssignProjectToTeamVNamesCommand } from "../impl/asign-project-to-team-vname.command";

@CommandHandler(AssignProjectToTeamVNamesCommand)
export class AssignProjectToTeamVNamesHandler implements ICommandHandler<AssignProjectToTeamVNamesCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    execute(command: AssignProjectToTeamVNamesCommand): Promise<any> {
        return this.repository.AssignProjectToTeamVNames(command.team_name,command.project_name);
    }
}