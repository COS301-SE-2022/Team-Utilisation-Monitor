import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { UserPerson } from "@team-utilisation-monitor/api/shared/data-access";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { DeleteTeamCommand } from "../impl/DeleteTeam.command";

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamHandler implements IQueryHandler<DeleteTeamCommand>
{
  constructor(private readonly repo:DataAccessRepository){}
  async execute(query: DeleteTeamCommand): Promise<any> {
      return this.repo.DeleteTeam(query.teamName);
  }
}
