import { GetTeamsOnProjectQuery } from './../impl/GetTeamsOnProject.query';
import { IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";

@QueryHandler(GetTeamsOnProjectQuery)
export class GetTeamsOnProjectHandler implements IQueryHandler<GetTeamsOnProjectQuery>{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: GetTeamsOnProjectQuery): Promise<any> {
      return this.repository.GetTeams(query.projectName);
  }
}
