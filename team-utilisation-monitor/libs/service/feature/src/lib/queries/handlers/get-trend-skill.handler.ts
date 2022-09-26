//getTrendSkillQuery
import { IQueryHandler,QueryHandler} from '@nestjs/cqrs'
import { getTrendSkillQuery } from '../impl/get-trend-skill.query'
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access'

@QueryHandler(getTrendSkillQuery)
export class getTrendSkillQueryHandler implements IQueryHandler<getTrendSkillQuery>{
    
    constructor(private readonly repository:DataAccessRepository){}
    
    async execute(query: getTrendSkillQuery): Promise<any>{
        return this.repository.getTrendSkill();
    }
}