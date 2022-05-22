import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOnePersonQuery } from "../impl/get-one-person.query";

@QueryHandler(GetOnePersonQuery)
export class GetOnePersonQueryHandler implements IQueryHandler<GetOnePersonQuery>{

    async execute(query: GetOnePersonQuery): Promise<any> {
        return "working";
    }
}