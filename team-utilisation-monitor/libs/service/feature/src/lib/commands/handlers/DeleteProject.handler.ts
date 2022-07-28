import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { DeleteProjectCommand } from "../impl/DeleteProject.command";

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements IQueryHandler<DeleteProjectCommand>
{
  constructor(public readonly repository:DataAccessRepository){}

  async execute(query: DeleteProjectCommand): Promise<any> {
      return this.repository.DeleteProject(query.projectName);
  }
}
