import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllocatedTeamsQuery } from "../impl/getAllocatedTeams.query";

@QueryHandler(GetAllocatedTeamsQuery)
export class GetAllocatedTeamsHandler implements IQueryHandler<GetAllocatedTeamsQuery>
{
  constructor(public repository:DataAccessRepository){}

  async execute(query: GetAllocatedTeamsQuery): Promise<any> {
    return this.repository.getAllocatedTeams(query.Email);
  }
}
