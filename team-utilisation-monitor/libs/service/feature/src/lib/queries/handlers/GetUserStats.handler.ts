import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetUserStatsQuery } from "../impl/GetUserStats.query";


@QueryHandler(GetUserStatsQuery)
export class GetUserStatsHandler implements IQueryHandler<GetUserStatsQuery>
{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: GetUserStatsQuery): Promise<any> {
    return this.repository.GetIndividualsStats(query.UserEmail)
  }
}
