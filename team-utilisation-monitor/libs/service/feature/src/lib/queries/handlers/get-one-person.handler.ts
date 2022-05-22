import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetOnePersonQuery } from "../impl/get-one-person.query";

@QueryHandler(GetOnePersonQuery)
export class GetOnePersonQueryHandler implements IQueryHandler<GetOnePersonQuery>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetOnePersonQuery): Promise<any> {
        return this.repository.getOnePersonVEmail(query.email);
    }
}