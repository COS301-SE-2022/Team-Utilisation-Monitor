import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetCompanyStats } from "../impl/get-company-stats.query";



@QueryHandler(GetCompanyStats)
export class GetCompanyStatsHandler implements IQueryHandler<GetCompanyStats>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetCompanyStats): Promise<any> {
        return this.repository.getCompanyStats(query.companyName);
    }
}
