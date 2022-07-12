import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ServiceFeatureService } from "../../service-feature.service";
import { getInviteCode } from "../impl/getInviteCode.query";

@QueryHandler(getInviteCode)
export class GetInviteCodeHandler implements IQueryHandler<getInviteCode>
{
  constructor(public service:ServiceFeatureService){}

  async execute(query: getInviteCode): Promise<any> {
    return this.service.GetInviteCode(query.company)
  }
}
