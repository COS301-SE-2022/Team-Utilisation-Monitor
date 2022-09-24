import { Project } from "../models/admin-project";

export class RemoveCompletedProject{
    static readonly type='[Team/Project View] Remove Complete Projec';

    constructor(public payload:Project){}
}