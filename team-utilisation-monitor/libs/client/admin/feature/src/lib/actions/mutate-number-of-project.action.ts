import { NumberOfProjects } from "../models/admin-number-of-projects";

export class IncreaseNumberOfProjects{
    static readonly type='[Admin Dashboard] Increase_Projects'

    constructor(public payload:NumberOfProjects){}
}