import { IQueryHandler,QueryHandler} from '@nestjs/cqrs'
import { GetAllPersonsQuery } from '../impl/get-all-persons.query'
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access'

@QueryHandler(GetAllPersonsQuery)
export class GetAllPersonsQueryHandler implements IQueryHandler<GetAllPersonsQuery>{
    
    constructor(private readonly repository:DataAccessRepository){}
    
    async execute(query: GetAllPersonsQuery): Promise<any>{
        return this.repository.getAllPersons();
    }
}