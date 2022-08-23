import { Project } from "../models/admin-project";

export class RemoveProject{

    static readonly type='[Team/ Project view] Remove Project'

    constructor (public payload:Project){}
}