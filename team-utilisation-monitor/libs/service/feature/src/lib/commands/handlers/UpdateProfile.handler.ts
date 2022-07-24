import { IQueryHandler, CommandHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { UpdateProfileCommand } from "../impl/UpdateProfile.command";

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements IQueryHandler<UpdateProfileCommand>
{
  constructor(public repo:DataAccessRepository){}

  async execute(query: UpdateProfileCommand): Promise<any> {
      return this.repo.UpdatePersonProfile(query.Email,query.Name,query.Surname)
  }
}
