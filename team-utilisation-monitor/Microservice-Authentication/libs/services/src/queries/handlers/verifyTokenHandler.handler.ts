import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AuthRepositoryService } from "auth-repo/auth-repository";
import { VerifyToken } from "../impl/verifyToken.query";

@QueryHandler(VerifyToken)
export class VerifyTokenHandler implements IQueryHandler<VerifyToken>{

    constructor(private readonly repository:AuthRepositoryService){}

    async execute(query: VerifyToken): Promise<Boolean> {
        return this.repository.verifyToken(query.token);
    }
}