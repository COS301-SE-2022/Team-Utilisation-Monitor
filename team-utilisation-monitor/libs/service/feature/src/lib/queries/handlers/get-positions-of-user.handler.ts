import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetPositionsOfUserQuery } from "../impl/get-positions-of-user.query";

@QueryHandler(GetPositionsOfUserQuery)
export class GetPositionsOfUserHandler implements IQueryHandler<GetPositionsOfUserQuery>{

    constructor(private repository:DataAccessRepository){}

    execute(query: GetPositionsOfUserQuery): Promise<any> {
        return this.repository.getUserPositions(query.email);
    }
}