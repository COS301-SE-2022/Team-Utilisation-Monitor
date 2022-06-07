import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetCompanyQuery } from './../impl/getCompany.query';

@QueryHandler(GetCompanyQuery)

@QueryHandler(GetCompanyQuery)
export class GetCompanyQueryHandler implements IQueryHandler<GetCompanyQuery>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetCompanyQuery): Promise<any> {
        return this.repository.getCompanyVName(query.name);
    }
}
