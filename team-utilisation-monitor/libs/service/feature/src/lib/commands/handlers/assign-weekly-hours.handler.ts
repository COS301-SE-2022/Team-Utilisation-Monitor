import { ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AssignWeeklyHoursCommand } from "../impl/assign-weekly-hours.command";

export class AssignWeeklyHoursHandler implements ICommandHandler<AssignWeeklyHoursCommand>
{
    constructor(public readonly repository:DataAccessRepository){}

    execute(command: AssignWeeklyHoursCommand): Promise<any> {
        return null;
    }
}