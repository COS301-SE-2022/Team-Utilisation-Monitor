import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetUserIDQuery } from "../impl/get-user-id.query";

@QueryHandler(GetUserIDQuery)
export class GetUserIDQueryHandler implements IQueryHandler<GetUserIDQuery>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetUserIDQuery): Promise<any> {
        return this.repository.getUserID(query.email);
    }
}