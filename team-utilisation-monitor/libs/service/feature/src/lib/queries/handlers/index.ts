import { GetAllPersonsQueryHandler } from "./get-all-persons.handler";
import { GetOnePersonQueryHandler } from "./get-one-person.handler";
import { LoginHandler } from "./login.handler";
import { GetCompanyQueryHandler } from "./getCompany.handler";
import { GetPendingRequestsHandler } from "./get-pending-requests.handler";
import { GetUserIDQueryHandler } from "./get-user-id.handler";
import { GetCompanyStatsHandler } from "./get-company-stats.handler";
import { GetAllEmployeesOfCompanyHandler } from "./get-all-employees-of-company.handler";
import { GetAllProjectsOrTeamsOfCompanyHandler } from "./get-all-project-or-teams.handler";
import {GetInviteCodeHandler} from "./getInviteCode.handler"


export const QueryHandlers=[GetAllProjectsOrTeamsOfCompanyHandler,GetAllEmployeesOfCompanyHandler,GetCompanyStatsHandler,GetUserIDQueryHandler,GetPendingRequestsHandler,GetAllPersonsQueryHandler,GetOnePersonQueryHandler,LoginHandler,GetCompanyQueryHandler,GetInviteCodeHandler]
