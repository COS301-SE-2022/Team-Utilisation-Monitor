import { Team } from "../models/admin-team";

export class AddTeam{
    static readonly type='[Admin Dashboard] Add Team';

    constructor(public payload:Team){}
}