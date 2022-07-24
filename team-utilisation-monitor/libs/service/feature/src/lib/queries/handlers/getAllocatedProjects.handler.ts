import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllocatedProjectsQuery } from "../impl/getAllocatedProjects.query";

@QueryHandler(GetAllocatedProjectsQuery)
export class GetAllocatedProjectsHandler implements IQueryHandler<GetAllocatedProjectsQuery>
{
  constructor(public repository:DataAccessRepository){}
  async execute(query: GetAllocatedProjectsQuery): Promise<any> {
      return this.repository.getAllocatedProjects(query.email);
  }
}
