import { CommandHandler,IQueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { DeleteTeamMemberCommand} from "../impl/DeleteTeamMember.command";

@CommandHandler(DeleteTeamMemberCommand)
export class DeleteTeamMemberHandler implements IQueryHandler<DeleteTeamMemberCommand>
{
  constructor(private repository:DataAccessRepository){}

  async execute(query: DeleteTeamMemberCommand): Promise<any> {
      return this.repository.deleteMember(query.teamName,query.email)
  }
}
