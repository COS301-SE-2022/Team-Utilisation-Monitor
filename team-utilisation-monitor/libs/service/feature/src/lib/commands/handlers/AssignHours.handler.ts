import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AssignHoursCommand } from "../impl/AssignHours.command";

@CommandHandler(AssignHoursCommand)
export class AssignHoursHandler implements IQueryHandler<AssignHoursCommand>
{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: AssignHoursCommand): Promise<any> {
      return this.repository.AssignWeeklyHours(query.UserEmail,query.Hours);
  }
}
