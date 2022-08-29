import { Project } from "../models/admin-project";

export class AddProject{
    static readonly type="[Team Project View] Add Team"

    constructor(public payload:Project){}
}