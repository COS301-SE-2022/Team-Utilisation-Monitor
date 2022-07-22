import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllTeamsWorkingOnProjectCommand } from "../impl/get-all-teams-working-on-project.query";

@QueryHandler(GetAllTeamsWorkingOnProjectCommand)
export class GetAllTeamsWorkingOnProjectHandler implements IQueryHandler<GetAllTeamsWorkingOnProjectCommand>
{

    constructor(public readonly repository:DataAccessRepository){}

    async execute(query: GetAllTeamsWorkingOnProjectCommand): Promise<any> {
        return this.repository.getAllTeamsWorkingOnProject(query.projectName);
    }
}
