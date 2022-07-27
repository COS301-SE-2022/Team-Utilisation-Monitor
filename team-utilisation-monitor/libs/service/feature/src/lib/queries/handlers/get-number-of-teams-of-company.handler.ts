import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetNumberOfTeamsOfCompany } from "../impl/get-number-of-teams-of-company.query";

@QueryHandler(GetNumberOfTeamsOfCompany)
export class GetNumberOfTeamsOfCompanyHandler implements IQueryHandler<GetNumberOfTeamsOfCompany>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetNumberOfTeamsOfCompany): Promise<any> {
        return this.repository.getNumberOfTeamsOfCompany(query.companyName);
    }
}