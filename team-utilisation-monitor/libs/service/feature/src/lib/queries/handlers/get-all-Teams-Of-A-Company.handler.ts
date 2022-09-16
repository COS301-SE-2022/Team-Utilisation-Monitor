import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllTeamsOfACompany } from "../impl/get-all-teams-of-company.query";

@QueryHandler(GetAllTeamsOfACompany)
export class GetAllTeamsOfACompanyHandler implements IQueryHandler<GetAllTeamsOfACompany>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetAllTeamsOfACompany): Promise<any> {
        const teams=await this.repository.getAllTeamsAndTheirMembers(query.companyName);
        
    }
}