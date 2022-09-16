import { NumberOfClosedProjects } from "../models/admin-numer-of-closed-projects";

export class IncreaseNumberOfClosedProjects{
    static readonly type='[Admin Dashboard] Increase_closed_projects';

    constructor(public payload:NumberOfClosedProjects){}
}