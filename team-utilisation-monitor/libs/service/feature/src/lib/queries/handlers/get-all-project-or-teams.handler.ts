import { IQueryHandler,QueryHandler} from '@nestjs/cqrs'
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access'
import { GetAllProjectsOrTeamsOfCompany } from '../impl/get-all-projects-or-teams.query';

@QueryHandler(GetAllProjectsOrTeamsOfCompany)
export class GetAllProjectsOrTeamsOfCompanyHandler implements IQueryHandler<GetAllProjectsOrTeamsOfCompany>{
    
    constructor(private readonly repository:DataAccessRepository){}
    
    async execute(query: GetAllProjectsOrTeamsOfCompany): Promise<any>{
        return this.repository.getAllProjectsOrTeamsOfCompany(query.company_name,query.contentType);
    }
}