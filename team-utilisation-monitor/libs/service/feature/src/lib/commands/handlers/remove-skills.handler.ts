import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { RemoveSkillCommand } from "../impl/remove-skill.command";

@CommandHandler(RemoveSkillCommand)
export class RemoveSkillHandler implements ICommandHandler<RemoveSkillCommand>{
    
    constructor(private repository:DataAccessRepository){}

    async execute(command: RemoveSkillCommand): Promise<boolean> {
        return this.repository.RemoveSkill(command.skillName);
    }
}