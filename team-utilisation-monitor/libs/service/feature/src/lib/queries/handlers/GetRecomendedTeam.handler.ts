import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetRecomendedTeamQuery } from "../impl/GetRecomendedTeam.query";

@QueryHandler(GetRecomendedTeamQuery)
export class GetRecomendedTeamHandler implements IQueryHandler<GetRecomendedTeamQuery>
{
  //
}
