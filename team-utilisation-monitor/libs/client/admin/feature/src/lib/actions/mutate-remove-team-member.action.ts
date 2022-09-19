import { TeamMember } from "../models/admin-team-member";

export class RemoveTeamMember{
    static readonly type='[Team/Project View] Remove Team Member';

    constructor(public payload:TeamMember){}
}