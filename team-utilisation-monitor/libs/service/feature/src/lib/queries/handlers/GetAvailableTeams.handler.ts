import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAvailableTeamsQuery } from "../impl/GetAvailableTeams.query";

@QueryHandler(GetAvailableTeamsQuery)
export class GetAvailableTeamsHandler implements IQueryHandler<GetAvailableTeamsQuery>
{
  constructor(public readonly repository:DataAccessRepository){}

  async execute(query: GetAvailableTeamsQuery): Promise<any> {
      return this.repository.GetAvailableTeamsForProject(query.projectName)
  }
}