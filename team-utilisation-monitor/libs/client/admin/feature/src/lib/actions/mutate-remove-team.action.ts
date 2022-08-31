import { Team } from "../models/admin-team"

export class RemoveTeam{
    static readonly type='[Team/ Project View] Remove Team'

    constructor(public payload:Team){}
}