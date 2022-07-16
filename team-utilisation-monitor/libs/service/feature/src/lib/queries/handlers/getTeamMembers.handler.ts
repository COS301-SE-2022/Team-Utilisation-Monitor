import { IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetTeamMembersQuery} from "../impl/getTeamMembers.query";

@QueryHandler(GetTeamMembersQuery)
export class GetTeamMembersHandler implements IQueryHandler<GetTeamMembersQuery>{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: GetTeamMembersQuery): Promise<any> {
      return this.repository.getTeamMembers(query.teamName);
  }
}
