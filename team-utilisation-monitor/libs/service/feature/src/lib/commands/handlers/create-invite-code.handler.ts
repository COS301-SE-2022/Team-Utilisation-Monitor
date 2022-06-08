import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreateInviteCodeCommand } from "../impl/create-invite-code.command";

@CommandHandler(CreateInviteCodeCommand)
export class CreateInviteCodeHandler implements ICommandHandler<CreateInviteCodeCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: CreateInviteCodeCommand): Promise<any> {
        return this.repository.createInviteCode(command.companyName);
    }
}