import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRepositoryService } from "auth-repo/auth-repository";
import { RegisterAdminCommand } from "../impl/register-admin.command";

@CommandHandler(RegisterAdminCommand)
export class RegisterAdminHandler implements ICommandHandler<RegisterAdminCommand>{

    constructor(private readonly repository:AuthRepositoryService){}

    async execute(command: RegisterAdminCommand): Promise<any> {
        
        return this.repository.registerAdminRepo(command.username,command.password);
    }
}