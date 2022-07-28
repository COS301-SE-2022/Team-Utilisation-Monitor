import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CompleteProjectCommand } from "../impl/CompleteProject.command";

@CommandHandler(CompleteProjectCommand)
export class CompleteProjectHandler implements IQueryHandler<CompleteProjectCommand>
{
  constructor(public readonly repository:DataAccessRepository){}

  async execute(query: CompleteProjectCommand): Promise<any> {
      return this.repository.completeProject(query.projectName);
  }
}
