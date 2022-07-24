import {CommandHandler,IQueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { UpdateUserSkillCommand} from './../impl/UpdateUserSkill.command';

@CommandHandler(UpdateUserSkillCommand)
export class UpdateUserSkillHandler implements IQueryHandler<UpdateUserSkillCommand>
{
  constructor(public readonly repository:DataAccessRepository){}
  async execute(query: UpdateUserSkillCommand): Promise<any> {
      return this.repository.UpdateSkill(query.UserEmail,query.skillName);
  }
}
