import { GetAllPersonsQueryHandler } from "./get-all-persons.handler";
import { GetOnePersonQueryHandler } from "./get-one-person.handler";
import { LoginHandler } from "./login.handler";
import { GetCompanyQueryHandler } from "./getCompany.handler";
import { GetPendingRequestsHandler } from "./get-pending-requests.handler";

export const QueryHandlers=[GetPendingRequestsHandler,GetAllPersonsQueryHandler,GetOnePersonQueryHandler,LoginHandler,GetCompanyQueryHandler]
