import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { GetPendingRequests } from "../impl/get-pending-requests.query";


@QueryHandler(GetPendingRequests)
export class GetPendingRequestsHandler implements IQueryHandler<GetPendingRequests>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetPendingRequests): Promise<any> {
        return this.repository.getPendingRequests(query.companyName);
    }
}
