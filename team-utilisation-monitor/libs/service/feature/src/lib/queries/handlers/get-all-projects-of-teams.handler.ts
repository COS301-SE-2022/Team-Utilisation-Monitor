import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllProjectsOfTeamsQuery } from "../impl/get-all-projects-of-teams.query";

@QueryHandler(GetAllProjectsOfTeamsQuery)
export class GetAllProjectsOfTeamsHandler implements IQueryHandler<GetAllProjectsOfTeamsQuery>
{
    constructor(private readonly respository:DataAccessRepository){}

    execute(query: GetAllProjectsOfTeamsQuery): Promise<any> {
       return this.respository.getAllProjectsOfTheTeam(query.teamName); 
    }
}