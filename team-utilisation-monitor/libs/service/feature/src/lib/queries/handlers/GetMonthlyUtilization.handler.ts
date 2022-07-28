import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetMonthlyUtilizationQuery } from "../impl/GetMonthlyUtilization.query";

@QueryHandler(GetMonthlyUtilizationQuery)
export class GetMonthlyUtilizationHandler implements IQueryHandler<GetMonthlyUtilizationQuery>
{
  constructor(private repository:DataAccessRepository){}

  async execute(query: GetMonthlyUtilizationQuery): Promise<any> {
      return this.repository.GetMonthlyUtilization(query.Email);
  }
}
