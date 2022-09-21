import { CommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { AddPositionCommand } from "../impl/AddPosition.command";

@CommandHandler(AddPositionCommand)
export class AddPositionHandler implements IQueryHandler<AddPositionCommand>
{
    constructor(private repository:DataAccessRepository){}

    async execute(query: AddPositionCommand): Promise<any> {
        return this.repository.addPosition(query.position);
    }
}