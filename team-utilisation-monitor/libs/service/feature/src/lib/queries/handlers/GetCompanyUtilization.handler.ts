import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetCompanyUtilizationQuery } from "../impl/GetCompanyUtilization.query";

@QueryHandler(GetCompanyUtilizationQuery)
export class GetCompanyUtilizationHandler implements IQueryHandler<GetCompanyUtilizationQuery>
{
  constructor(private repository:DataAccessRepository){}

  async execute(query: GetCompanyUtilizationQuery): Promise<any> {
      return this.repository.GetCompanyUtilization();
  }
}
