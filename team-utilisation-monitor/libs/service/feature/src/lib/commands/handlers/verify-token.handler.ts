import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { VerifyTokenCommand } from "../impl/verify-token.command";

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenHandler implements ICommandHandler<VerifyTokenCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    execute(command: VerifyTokenCommand): Promise<any> {
        return this.repository.verifyToken(command.email,command.token);
    }
}