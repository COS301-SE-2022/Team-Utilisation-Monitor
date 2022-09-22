import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetAllPositionsOfCompanyCommand } from "../impl/get-all-positions-of-company.query";

@QueryHandler(GetAllPositionsOfCompanyCommand)
export class GetAllPositionsOfCompanyHandler implements IQueryHandler<GetAllPositionsOfCompanyCommand>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetAllPositionsOfCompanyCommand): Promise<any> {
        return this.repository.getAllPositions();
    }
}