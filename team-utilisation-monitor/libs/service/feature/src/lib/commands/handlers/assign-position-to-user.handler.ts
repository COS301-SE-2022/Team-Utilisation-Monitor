import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AssignPositionToUserCommand } from "../impl/assign-position-to-user.command";

@CommandHandler(AssignPositionToUserCommand)
export class AssignPositionToUserHandler implements ICommandHandler<AssignPositionToUserCommand>{

    constructor(private repository:DataAccessRepository){}

    execute(command: AssignPositionToUserCommand): Promise<any> {
        return this.repository.assignPositionToUser(command.assignee_email,command.position_name,command.teamName);
    }
}