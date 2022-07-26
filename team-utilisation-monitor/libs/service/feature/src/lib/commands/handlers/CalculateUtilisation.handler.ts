import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CalculateUtilizationCommand } from "../impl/CalculateUtilization.command";

@CommandHandler(CalculateUtilizationCommand)
export class CalculateUtilizationHandler implements IQueryHandler<CalculateUtilizationCommand>
{
  constructor(public readonly repository:DataAccessRepository){}

  async execute(query: CalculateUtilizationCommand): Promise<any> {
      return this.repository.CalculateUtilizationVProject(query.projectName);
  }
}
