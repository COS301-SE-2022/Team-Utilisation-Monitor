import { Project } from "../models/admin-project";


export class AddCompletProject{
    static readonly type="[Team/Project View] Add Completed Proejct";

    constructor(public payload:Project){}
}