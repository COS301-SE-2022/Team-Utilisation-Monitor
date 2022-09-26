import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { RemovePositionCommand } from "../impl/remove-position.command";

@CommandHandler(RemovePositionCommand)
export class RemovePositionHandler implements ICommandHandler<RemovePositionCommand>{

    constructor(private repository:DataAccessRepository){}

    execute(command: RemovePositionCommand): Promise<any> {
        return this.repository.removePosition(command.position_name);
    }

}