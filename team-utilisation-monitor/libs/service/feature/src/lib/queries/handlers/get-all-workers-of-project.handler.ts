import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetWorkersOfProject } from "../impl/get-all-workers-of-project.query";
import { GetUserIDQuery } from "../impl/get-user-id.query";

@QueryHandler(GetWorkersOfProject)
export class GetWorkersOfProjectHandler implements IQueryHandler<GetWorkersOfProject>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetWorkersOfProject): Promise<any> {
        return this.repository.getWorkersOfProject(query.projectName);
    }
}