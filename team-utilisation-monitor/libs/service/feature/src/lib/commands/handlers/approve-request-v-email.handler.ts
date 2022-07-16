import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { ApproveRequestVEmailCommand } from "../impl/approve-request-v-email.command";

@CommandHandler(ApproveRequestVEmailCommand)
export class ApproveRequestVEmailHandler implements ICommandHandler<ApproveRequestVEmailCommand>
{

    constructor(private readonly repository:DataAccessRepository){}

    execute(command: ApproveRequestVEmailCommand): Promise<any> {
        return this.repository.approveRequestVEmail(command.email);
    }
}
