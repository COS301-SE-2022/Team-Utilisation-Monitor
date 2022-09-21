import { TeamMember } from "../models/admin-team-member";

export class AddTeamMember{
    static readonly type='[Team/Project View] Add Team Member';

    constructor(public payload:TeamMember){}
}