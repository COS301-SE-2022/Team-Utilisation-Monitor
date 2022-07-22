import { IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetUtilizedEmployeesQuery } from "../impl/GetUnderUtilizedEmployees.query";

@QueryHandler(GetUtilizedEmployeesQuery)
export class GetUtilizedEmployeesHandler implements IQueryHandler<GetUtilizedEmployeesQuery>
{
  constructor(public readonly repository:DataAccessRepository){}

  async execute(query: GetUtilizedEmployeesQuery): Promise<any> {
    return this.repository.GetUnderUtilizedEmployees(query.cName);
  }
}
