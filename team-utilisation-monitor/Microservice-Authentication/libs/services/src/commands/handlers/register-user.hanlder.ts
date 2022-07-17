import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRepositoryService } from "auth-repo/auth-repository";
import { RegisterUserCommand } from "../impl/register-user.command";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHanlder implements ICommandHandler<RegisterUserCommand>
{
    constructor(private readonly repository:AuthRepositoryService){}

    async execute(command: RegisterUserCommand): Promise<any> {
        return this.repository.registerUserRepo(command.name,command.surname,command.username,command.password);
    }
} 