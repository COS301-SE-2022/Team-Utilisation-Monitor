import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { VerifyTokenCommand } from "../impl/verify-token.command";

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenHandler implements ICommandHandler<VerifyTokenCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    async execute(command: VerifyTokenCommand): Promise<any> {
    
        const active_token=await this.repository.getToken(command.email);

        if(active_token==command.token){ //if the token in the db is the same as the token i've sent.
            return true;
        }
        else
            return false;
    }
}