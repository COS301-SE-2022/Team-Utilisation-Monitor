import { CommandHandler, ICommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { SetTokenCommand } from "../impl/set-token.command";

@CommandHandler(SetTokenCommand)
export class SetTokeHandler implements ICommandHandler<SetTokenCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    execute(command: SetTokenCommand): Promise<any> {
        return this.repository.setToken(command.email,command.token);
    }
}