import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetSkillsQuery } from "../impl/GetSkills.query";

@QueryHandler(GetSkillsQuery)
export class GetSkillsHandler implements IQueryHandler<GetSkillsQuery>
{
  constructor(public repo:DataAccessRepository){}
  async execute(query: GetSkillsQuery): Promise<any> {
      this.repo.getSkills();
  }
}
