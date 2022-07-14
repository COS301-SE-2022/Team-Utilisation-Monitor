import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { CreateAdminCommand } from "../impl/create-admin.command";


@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements IQueryHandler<CreateAdminCommand>{


    constructor(private readonly repository:DataAccessRepository){}

    async execute(command: CreateAdminCommand): Promise<any> {
        return this.repository.createUserAdmin(command.name,command.surname,command.email,command.companyName,command.password);
    }
}
