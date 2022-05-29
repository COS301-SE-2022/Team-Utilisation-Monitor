import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetUserIDQuery } from "../impl/get-user-id.query";

// @QueryHandler(GetOnePersonQuery)
// export class GetOnePersonQueryHandler implements IQueryHandler<GetOnePersonQuery>{

//     constructor(private readonly repository:DataAccessRepository){}

//     async execute(query: GetOnePersonQuery): Promise<any> {
//         return this.repository.getOnePersonVEmail(query.email);
//     }
// }

@QueryHandler(GetUserIDQuery)
export class GetOnePersonQueryHandler implements IQueryHandler<GetUserIDQuery>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetUserIDQuery): Promise<any> {
        return this.repository.getOnePersonVEmail(query.user);
    }
}