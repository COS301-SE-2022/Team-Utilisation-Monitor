import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { VerifyTokenCommand } from "../impl/verify-token.command";

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenHandler implements ICommandHandler<VerifyTokenCommand>
{
    constructor(private readonly repository:DataAccessRepository){}

    async execute(command: VerifyTokenCommand): Promise<any> {
        
        const token=await this.repository.getToken(command.email);

        if(token)
        {
            if(token==command.token){
                return true   
            }
            else
                return false;
        }  
    }
}