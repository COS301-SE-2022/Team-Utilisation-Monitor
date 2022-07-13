import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { getInviteCode } from "../impl/getInviteCode.query";

@QueryHandler(getInviteCode)
export class GetInviteCodeHandler implements IQueryHandler<getInviteCode>
{
  constructor(private readonly repository:DataAccessRepository){}

  async execute(query: getInviteCode): Promise<any> {
    return this.repository.getInviteCode(query.company)
  }
}
