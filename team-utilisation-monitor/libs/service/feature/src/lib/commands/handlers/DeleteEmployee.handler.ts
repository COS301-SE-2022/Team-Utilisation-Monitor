import { CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { DeleteEmployeeCommand } from "../impl/DeleteEmployee.command";

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeHandler implements IQueryHandler<DeleteEmployeeCommand>{
  constructor(private readonly service:DataAccessRepository){}

  async execute(query: DeleteEmployeeCommand): Promise<any> {
      return this.service.deleteEmployee(query.email);
  }

}
