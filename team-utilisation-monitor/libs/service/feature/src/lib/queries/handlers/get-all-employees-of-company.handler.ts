import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllEmployeesOfCompany } from "../impl/get-all-employees-of-company.query";
import { GetUserIDQuery } from "../impl/get-user-id.query";

@QueryHandler(GetAllEmployeesOfCompany)
export class GetAllEmployeesOfCompanyHandler implements IQueryHandler<GetAllEmployeesOfCompany>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetAllEmployeesOfCompany): Promise<any> {
        return this.repository.getEmployeesOfCompany(query.companyName);
    }
}