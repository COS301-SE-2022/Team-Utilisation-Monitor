import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllMembersOfTeam } from "../impl/get-all-members-of-team.query";

@QueryHandler(GetAllMembersOfTeam)
export class GetAllMembersOfTeamHandler implements IQueryHandler<GetAllMembersOfTeam>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetAllMembersOfTeam): Promise<any> {
        return this.repository.getAllMemebrsOfTeam(query.teamName);
    }
}