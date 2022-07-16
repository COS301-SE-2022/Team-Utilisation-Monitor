import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AddTeamMemberCommand } from "../impl/addTeamMember.command";

@CommandHandler(AddTeamMemberCommand)
export class AddTeamMemberHandler implements IQueryHandler<AddTeamMemberCommand>{

  constructor(private readonly repository:DataAccessRepository){}

  async execute(command: AddTeamMemberCommand): Promise<any> {

    return this.repository.addTeamMember(command.TeamName,command.EmployeeEmail);
  }

}
