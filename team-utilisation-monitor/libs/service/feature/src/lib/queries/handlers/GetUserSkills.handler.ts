import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetUserSkillsQuery } from "../impl/GetUsersSkills.query";

@QueryHandler(GetUserSkillsQuery)
export class GetUserSkillsHandler implements IQueryHandler<GetUserSkillsQuery>
{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: GetUserSkillsQuery): Promise<any> {
      return this.repository.GetUserSkills(query.UserEmail);
  }
}
