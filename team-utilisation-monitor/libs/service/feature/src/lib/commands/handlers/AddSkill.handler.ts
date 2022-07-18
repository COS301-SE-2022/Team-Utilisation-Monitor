import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AddSkillCommand } from "../impl/AddSkill.command";


@CommandHandler(AddSkillCommand)
export class AddSkillHandler implements IQueryHandler<AddSkillCommand>
{
  constructor(public repository:DataAccessRepository){}
  async execute(query: AddSkillCommand): Promise<any> {
      return this.repository.addSkill(query.skillType,query.companyName);
  }
}
