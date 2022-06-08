import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { ApproveRequestCommand } from "../impl/approve-request.command";


@CommandHandler(ApproveRequestCommand)
export class ApproveRequestHandler implements ICommandHandler<ApproveRequestCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: ApproveRequestCommand): Promise<any> {
        return this.repository.approveRequest(command.id); 
    }
}